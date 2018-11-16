const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let coins = require("./coins.json");
let cmdcooldown = new Set();
let cmdcdseconds = 5;
let E001 = "`[001] You must wait 5 seconds between commands`"
let E002 = "`[002] You must wait 24 hours between uses`"
let E003 = "`[003] You must have permission ADMINISTRATOR to use this command`"
let E004 = "`[004] You must provide a user to use this command.`"
let E005 = "`[005] You must provide an amount to use this command`"
let dailycooldown = new Set();
let dailycdseconds = 86400;
let color = require("./colors.json");
let rank = require("./rank.json");
bot.on("ready", async () => {
  console.log(`EcoBot is online!`);
  
});
bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
let auth = message.author
let messageArray = message.content.split(" ");
let args = messageArray.slice(1);
let cmd = messageArray[0];
let auth2 = message.author.username
if (!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
    };
}
let Status = message.guild.memberCount - 10
let prefix = botconfig.prefix
bot.user.setActivity(`${Status} users! | ${botconfig.prefix}help`, {type: "WATCHING"});
let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);
if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    let Error = new Discord.RichEmbed()  
    if (err) console.log(err)
  });
  let CoinEmbed = new Discord.RichEmbed()
  .setColor("#E0A80d")
  .setTitle(`💸 ${coinAmt} coins added! 💸`)
  .setDescription(`${auth}`)
  message.channel.send(CoinEmbed).then(msg => {msg.delete(10000)});
}
if(!message.content.startsWith(prefix)) return;
if(cmdcooldown.has(message.author.id)){
  message.delete();
    let EE001 = new Discord.RichEmbed()
    .setColor(color.error)
    .setTitle("Error")
    .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E001}`)
  return message.channel.send(EE001).then(msg => {msg.delete(10000)})
}
if(!message.member.hasPermission("ADMINISTRATOR")){
  cmdcooldown.add(message.author.id);
}
setTimeout(() => {
  cmdcooldown.delete(message.author.id)
}, cmdcdseconds * 1000)


//COMMANDS\\
//COMMANDS\\
//COMMANDS\\

//!rank
if(cmd === `${prefix}rank`) {
  if(message.member.hasPermission("ADMINISTRATOR")) {
    if(!rank[message.author.id]){
      rank[message.author.id] = {
        rank: 0
      };
    }
    let rRank = rank[message.author.id].rank;
    return message.channel.send(`You are rank **${rRank}**!`)
  }
}


//!boo
if(cmd === `${prefix}boo`) {
  let replies = ["Best Witches!", "Boo!", "Ghosts Gather Here", "Spooky Scary Skelatons! ", "I'm Off Havin A Coffin Break!"]
  let result = Math.floor((Math.random() * replies.length));
  let bEmbed = new Discord.RichEmbed()
  .setColor(color.orange)
  .setTitle(replies[result])
  message.channel.send(bEmbed);
}

//!help
if(cmd === `${prefix}help`) {
  let staffRole = message.guild.roles.get(`495347169914781696`)
  let ownerRole = message.guild.roles.get(`421421649129111556`)
  let hEmbed = new Discord.RichEmbed()
      .setColor(color.lightblue)
      .setTitle("**Help Menu!**")
      .addField("Member Commands", "`!help` - Brings up this menu\n`!coins` - Displays how many coins you have\n`!pay` `@user` `amount` - Pays a user the specified amount of coins\n`!daily` - Gives you 25 coins but can only be used every 24 hours\n`!hug` - Get a nice warm hug from the bot")
      .addField(":tada: Event Commands", "`!boo` - Sends a spooky message your way")
    message.author.send(hEmbed)
  let h2Embed = new Discord.RichEmbed()
    .setTitle(":white_check_mark: Sent you the help menu. Please check your DMs")
    .setColor(color.lightblue)
  message.channel.send(h2Embed).then(msg => {msg.delete(15000)})
  if(message.member.roles.has(staffRole.id)){
    let staffEmbed = new Discord.RichEmbed()
      .setColor(color.lightblue)
      .addField("Staff Commands", "Coming soon")
    message.author.send(staffEmbed)
  }
  if(message.member.roles.has(ownerRole.id)){
    let ownerEmbed = new Discord.RichEmbed()
      .setColor(color.lightblue)
      .addField("Owner Commands", "`!coin` `@user` `add|sub|set` `amount` - Sets, adds, or subtracts coins from the specified user")
    message.author.send(ownerEmbed)
  } 
}

//!pay <@user> <amount>
if(cmd === `${prefix}pay`) {
  if(!coins[message.author.id]){
    return message.reply("You don't have any coins to pay with!")
  }  
  let pUser = message.mentions.members.first();
  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }
  if (isNaN(args[1])) return message.reply("You haven't entered a valid amount");
  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;
  if(sCoins < args[1]) return message.reply("Not enough coins to do this!");
  coins[message.author.id] = {
      coins: sCoins - parseInt(args[1])
  };
  coins[pUser.id] = {
      coins: pCoins + parseInt(args[1])
  };
  message.channel.send("**Payment Succesful**"); 
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log (err)
  });
  }
  
  if(cmd === `${prefix}coming`) {
    if(message.member.hasPermission("ADMINISTRATOR")) {
      if(args[0] === soon) {
        let csEmbed = new Discord.RichEmbed()
        .setColor(color.lightblue)
        .setTitle("Commands coming soon!")
        .setDescription("`!shop` - opens the shop\n`!gamble` `amount`- gambles whatever amount you entered\n`!rank` - displays your rank\n`!rankup` - ranks you up for a fee of coins\n`!leaderboard` - displays the coin leaderboard\n`!profile` - displays your profile\n`!prestige` - prestiges you with some perks\n`!8ball` `question` - will answer your question like a magic 8 ball\n`!badge` `@user` `add|take` `badge` - Staff command that will add or remove a badge")
        .setFooter("DM @Cobble8#0881 to suggest more commands!")
        return message.channel.send(csEmbed)
      }
    }
  }

  //!daily
  if(cmd === `${prefix}daily`) {
    if(dailycooldown.has(message.author.id)){
      let EE002 = new Discord.RichEmbed()
      .setColor(color.error)
      .setTitle("Error")
      .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E002}`)
  return message.channel.send(EE002)
    }
    else { 
      let dUser = message.author.id
      let dCoins = coins[message.author.id].coins;
      let dailyEmbed = new Discord.RichEmbed()
    .setColor(color.lime)
    .setTitle("Success!")
    .setDescription("You have claimed your daily reward of 25 coins!")
  message.channel.send(dailyEmbed)
  coins[dUser] = {
    coins: dCoins + 25
  };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log (err)
});
  dailycooldown.add(message.author.id);
  setTimeout(() => {
    dailycooldown.delete(message.author.id)
  }, dailycdseconds * 1000)
    }}
  
  //!coin <@user> <set|add|sub> <amount>
    if(cmd === `${prefix}coin`) {
    switch(args[1]){
      case "set":
          //code to set the coins
          if(!(args[2])) {
            let EE005 = new Discord.RichEmbed()
            .setColor(color.error)
            .setTitle("Error")
            .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E005}`)
          return message.channel.send(EE005)
            }
        if(message.member.hasPermission("ADMINISTRATOR")){
            let cSet = parseInt(args[2])
            let cUser = message.mentions.users.first();
            let cCoins = coins[cUser.id].coins;
            let cEmbed = new Discord.RichEmbed()
            .setColor(color.lightblue)
            .setTitle(`${cUser.username} coins have been set to ${cSet}!`)
          coins[cUser.id] = {
            coins: cSet
          }
          return message.channel.send(cEmbed)
        }
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log (err)
          });
          return
      case "add":
          //code to add the coins
          if(!(args[2])) {
            let EE005 = new Discord.RichEmbed()
            .setColor(color.error)
            .setTitle("Error")
            .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E005}`)
          return message.channel.send(EE005)
            }
        if(message.member.hasPermission("ADMINISTRATOR")){
          let cAdded = parseInt(args[2])
          let cUser = message.mentions.users.first();
          let cCoins = coins[cUser.id].coins;
          let cEmbed = new Discord.RichEmbed()
          .setColor(color.lightblue)
          .setTitle(`${cAdded} coins have been added to ${cUser.username}'s account!`)
        coins[cUser.id] = {
          coins: cCoins + parseInt(args[2])
        }
        message.channel.send(cEmbed)
      }
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log (err)
        });
          return
      case "sub":
          //code to subtract the coins
          if(!(args[2])) {
            let EE005 = new Discord.RichEmbed()
            .setColor(color.error)
            .setTitle("Error")
            .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E005}`)
          return message.channel.send(EE005)
            }
        if(message.member.hasPermission("ADMINISTRATOR")){
            let cSubbed = parseInt(args[2])
            let cUser = message.mentions.users.first();
            let cCoins = coins[cUser.id].coins;
            let cEmbed = new Discord.RichEmbed()
            .setColor(color.lightblue)
            .setTitle(`${cSubbed} coins have been taken from ${cUser.username}'s account!`)
          coins[cUser.id] = {
            coins: cCoins - parseInt(args[2])
          }
          return message.channel.send(cEmbed)
        }
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log (err)
          });
          return
      default:
          //send an error embed
          let EE003 = new Discord.RichEmbed()
            .setColor(color.error)
            .setTitle("Error")
            .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E003}`)
          message.channel.send(EE003)
          return
  }
  }

  //!botinfo
  if(cmd === `${prefix}botinfo`) {
    if(message.member.hasPermission("MANAGE_MESSAGES")){
      let bicon = bot.user.displayAvatarURL;
      let totalSeconds = (bot.uptime / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let days = Math.floor(totalSeconds /86400)
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
      let botembed = new Discord.RichEmbed()
      .setTitle("Bot Information")
      .setColor(color.lime)
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username)
      .addField("Current Uptime", uptime)
      .addField("Ping", `${Math.round(bot.ping)}ms`)
      .addField("Created On", bot.user.createdAt);
    message.channel.send(botembed);
  }}
  
  //!serverinfo
  if(cmd === `${prefix}serverinfo`) {
    if(message.member.hasPermission("MANAGE_MESSAGES")){
      let serverembed = new Discord.RichEmbed()
      .setTitle("Server Information")
      .setColor(color.lime)
      .addField("Server Name", message.guild.name)
      .addField("Total Members", message.guild.memberCount)
      .setFooter(`ID: ${message.guild.id} | Created On 07/10/2018`);
    message.channel.send(serverembed);
    }}
  
  //!info
  if(cmd === `${prefix}info`) {
    let infoembed = new Discord.RichEmbed()
    .setTitle("**Member Count**")
    .setColor(color.pink)
    .addField("PC Count", 13)
    .addField("Xbox Count", 4)
    .addField("PS4 Count", 1)
    .setFooter(`Updated On 10/2/2018`);
  message.channel.send(infoembed);
  }
  
  //!hug
  if(cmd === `${prefix}hug`) {
    message.channel.send(`Heres a nice warm hug ${message.author}`);
  }
  
  //!coins
  if(cmd === `${prefix}coins`) {
    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }
    let uCoins = coins[message.author.id].coins;
    let coinEmbed = new Discord.RichEmbed()
    //let auth = message.author
    .setTitle(`${auth2} has ${uCoins} coins.`)
    .setColor(color.coin);
    message.channel.send(coinEmbed).then(msg => {msg.delete(15000)});
}
})
bot.login(botconfig.ecotoken);