const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply (":no_entry_sign: **You do not have permission for that command!** :no_entry_sign:");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: `!`prefix <new prefix>")

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
      prefixes: args[0]
  };
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(error)
  });

  let pEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Prefix Set!")
  .setDescription(`Set to ${args[0]}`);
  
  message.channel.send(pEmbed);
}

module.exports.help = {
    name: "prefix"
}