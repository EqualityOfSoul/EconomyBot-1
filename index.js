const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let coins = require("./coins.json");
let badges = require("./badges.json");
let cmdcooldown = new Set();
let cmdcdseconds = 5;
let E001 = "`[001] You must wait 5 seconds between commands`"
let E002 = "`[002] You must wait 24 hours between uses`"
let E003 = "`[003] You must have permission ADMINISTRATOR to use this command`"
let E004 = "`[004] You must provide a user to use this command.`"
let E005 = "`[005] You must provide an amount to use this command`"
let E006 = "`[006] Incorrect usage: !coin <@user> <add|sub|set> <amount>`"
let dailycooldown = new Set();
let dailycdseconds = 86400;
let color = require("./colors.json");
let rank = require("./rank.json");
let role = require("./role.json");
let prestige = require("./prestige.json");
let welcomeMessage = require("./welcomeMessage.json");

bot.on("ready", async () => {
  console.log(`Tester Bot is online!`);
  
});
bot.on("message", async message => {
if(message.author.bot) return;

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
let auth = message.author
let messageArray = message.content.split(" ");
let args = messageArray.slice(1);
let cmd = messageArray[0];
let auth2 = message.author.username
if(message.channel.type === "dm") return;
let prefix = botconfig.prefix
bot.user.setActivity(`${message.guild.memberCount} users! | ${botconfig.prefix}help`, {type: "WATCHING"});
let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
let rankuplogs = message.guild.channels.find(c => c.name === "🤖rankup-logs");
let prestigelogs = message.guild.channels.find(c => c.name === "508286259077185536");
let TEMP = "TEMP"
let botImage = bot.user.displayAvatarURL
let authImage = message.author.displayAvatarURL
const channelName = message.mentions
const content123 = args.slice(4).join(" ");
let welcomeColor = require("./welcomeColor.json");
let welcomeChannel = require("./welcomeChannel");
const userAmount = message.guild.members.filter(mem => !mem.user.bot).size;
let x = message.guild.members;
let Status = x.filter(m => !m.user.bot).size;
bot.user.setActivity(`${Status} users! | ${botconfig.prefix}help`, {type: "WATCHING"});
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
  .setColor(color.coin)
  .setTitle(`💸 ${coinAmt} coins added! 💸`)
  .setDescription(`${auth}`)
  message.channel.send(CoinEmbed).then(msg => {msg.delete(10000)});
}
if(!message.content.startsWith(prefix)) return;
if(cmdcooldown.has(message.author.id)){
  message.delete();
    let EE001 = new Discord.RichEmbed()
    .setColor("#ED5858")
    .setTitle("Error")
    .setDescription(`An error occurred when attempting to perform that request. Please check the Syntax and try again.\nError: ${E001}`)
  return message.channel.send(EE001)
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

//!badge @user BadgeListForUser
if(cmd === `${prefix}badge`) {
  if(message.member.hasPermission("ADMINISTRATOR")) {
  if(!badges[message.author.id]){
    badges[message.author.id] = {
      badges: ""};}
  if(!args[1]) {
    return message.reply("Usage: `!badge` `@user` `BadgeListForThatUser`")}
  else {
    badges[message.mentions.users.first().id] = {
      badges: args.slice(1).join(" ")}
    fs.writeFile("./badges.json", JSON.stringify(badges), (err) => {
      if (err) console.log (err)})
    let bTag2 = message.mentions.users.first().username
    let bImage = message.mentions.users.first().displayAvatarURL
    let bMessage = args.slice(1).join(" ");
    let badgeEmbed = new Discord.RichEmbed()
    .setColor(color.lightblue)
    .setAuthor(`${bTag2}'s badges have been set to ${bMessage}`, `${bImage}`)
    return message.channel.send(badgeEmbed)}}}
  
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

//secret command... !food
if(cmd === `${prefix}food`) {
  if(!args[0]) {
    let foodEmbed = new Discord.RichEmbed()
    .setColor(color.lime)
    .setTitle("**Food!**")
    .addField("Cookie:", "🍪", true)
    .addField("Pizza:", "🍕", true)
    .addField("Ice Cream:", "🍨", true)
    .addField("Cheese Burger:", "🍔", true)
    .addField("Hot Dog:", "🌭", true)
    .addField("Popcorn:", "🍿", true)
    .addField("Doghnut:", "🍩", true)
    .addField("Cheese:", "🧀", true)
    .addField("Bacon:", "🥓", true)
    return message.channel.send(foodEmbed)}}
  
//!broadcast
if(cmd === `${prefix}broadcast`) {
  let channelID = args[0]
  let bChannel = message.guild.channels.find(c => c.id ===`${channelID}`)
  let content = args.slice(2).join(" ");
  if(!args[2]) {
    message.reply("Usage: `!broadcast` `channelID` `EmbedColor` `Words`")
    message.channel.send("Example: `!broadcast` `421525951969755137` `#FFFFFF` `Hello`, will respond with")
    let tEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription("Hello")
    return message.channel.send(tEmbed)}
  let Bembed = new Discord.RichEmbed()
  .setColor(args[1])
  .setDescription(content)
  return bChannel.send(Bembed)}

//!8ball <question>
if(cmd === `${prefix}8ball`) {
  if(!(args[2])) {
    message.reply("please ask a full question!")}
  else {
    let replies = ["Yes", "No", "Ask again", "I don't know", "Maybe", "Probably", "Unlikely", "Possibly"]
    let bResult = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");
    let bEmbed = new Discord.RichEmbed()
      .setAuthor(auth2)
      .setColor(color.purple)
      .addField("Question", question)
      .addField("Answer", replies[bResult])
    return message.channel.send(bEmbed)}}

//!profile
if(cmd === `${prefix}profile`) {
  let uBadges = badges[message.author.id].badges;
  let rank1 = rank[message.author.id].rank;
  let rank2 = ["HOW THE FUCK ARE YOU RANK `0`?!?!?!?", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "HOW THE FUCK ARE YOU RANK `11`?!?!?!?"]
  let rank3 = rank2[rank1]
  let joined = message.member.joinedAt.toLocaleString()
  let uCoins = coins[message.author.id].coins;
  let Color = message.member.highestRole.hexColor;
  if(!prestige[message.author.id]){
    prestige[message.author.id] = {
      prestige: 0}}
    fs.writeFile("./prestige.json", JSON.stringify(prestige), (err) => {
      if (err) console.log (err)})
  if(!role[message.author.id]){
    role[message.author.id] = {
      role: "<:Member:506209623662133259>"}}
    fs.writeFile("./role.json", JSON.stringify(role), (err) => {
      if (err) console.log (err)})
  let Role = role[message.author.id].role;
  let Prestige = prestige[message.author.id].prestige;
  let pEmbed = new Discord.RichEmbed()
  .setColor(Color)
  .setTitle(`${Role} ${auth2}'s profile!`)
  .setDescription(uBadges, true)
  .addField("Rank", "Coming Soon", true)
  .addField("Prestige", "Coming Soon", true)
  .addBlankField(true)
  .addField("Member Since", joined, true)
  .addField("Balance", `${uCoins} Coins`, true)
  .addBlankField(true)
  return message.channel.send(pEmbed)}
  
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

  //!gamble <amount>
if(cmd === `${prefix}gamble`) {
  if(parseInt(args[0])) {
    let gUser = message.author.id
    let gCoins = coins[message.author.id].coins
    let gAmount = parseInt(args[0])
    let chance = Math.random() + 1
    if(gUser >= gAmount) {
      if(chance = 1){
        let win = new Discord.RichEmbed()
          .setColor(color.lime)
          .setAuthor(auth2, botImage)
          .setDescription(`You have won ${gAmount} coins and recieved your original bet back!`)
        coins[gUser] = {
          coins: gCoins + gAmount}
        message.channel.send(win)
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log (err)});
      }else{
        let lose = new Discord.RichEmbed()
          .setColor(color.red)
          .setAuthor(auth2, botImage)
          .setDescription(`You have lost ${gAmount}** coins!`)
          coins[gUser] = {
            coins: gCoins - gAmount}
        message.channel.send(lose)
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log (err)});}}}}

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
  
 
  //!hug
  if(cmd === `${prefix}hug`) {
    message.channel.send(`Heres a nice warm hug ${message.author}`);
  }
  
  //!coins
  if(cmd === `${prefix}coins`) {
    if(!(args[0])) {
    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0};}
    let uCoins = coins[message.author.id].coins;
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(`${auth2}'s coins:`, authImage)
    .setDescription(`You currently have ${uCoins} coins!`)
    .setColor(color.coin);
    return message.channel.send(coinEmbed)}
    else {
      let mentionedUser = message.mentions.users.first().id
      let mentionedUser2 = message.mentions.users.first().username
      let mentionedUser3 = message.mentions.users.first().displayAvatarURL
      let mCoins = coins[mentionedUser].coins;
      let otherCoinEmbed = new Discord.RichEmbed()
      .setAuthor(`${mentionedUser2}'s coins`, mentionedUser3)
      .setDescription(`They currently have ${mCoins} coins!`)
      .setColor(color.coin)
      return message.channel.send(otherCoinEmbed)}}

})
bot.login(botconfig.ecotoken);
