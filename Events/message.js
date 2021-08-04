const Discord = require("discord.js");
const Settings = require('../Settings/Settings.json');
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 0);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(Settings.BotSettings.prefix)) return;
  let command = message.content.split(' ')[0].slice(Settings.BotSettings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
module.exports = async message => {
  
  let client = message.client;
  if (message.author.bot) return;
  if(!message.guild) return

  let prefix = Settings.BotSettings.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    message.channel.send(new Discord.MessageEmbed().setColor("ff0000").setAuthor('Dikkat').setDescription(`**${message.author}** Komutlarımda  \`${prefix}${command}\` adında bir komut bulamadım.`).setFooter(`Tüm komutları ayrıntılı bir şekilde görüntülemek için ${prefix}yardım`)).then(m => m.delete({timeout: 100000}))
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
