const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
const db = require("quick.db")
require("moment-duration-format");

exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const msg = message


   const zaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const embed = new Discord.MessageEmbed()

  .setColor('RANDOM')
  .setAuthor('Menthe İstatistik', message.author.avatarURL({dynamic:true}))
  .setThumbnail(bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
  .addField("» **Botun Sahibi**", "<@812782699348492308>")
  .addField("» **Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB',true) 
  .addField("» **Çalışma süresi**", zaman,true)
  .addField('» **Kullanıcılar**:', bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0),true)
  .addField("» **Sunucular**", bot.guilds.cache.size.toLocaleString(),true)
  .addField("» **Ping**", bot.ws.ping+" ms",true)
  .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
  .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``,true)
  .addField("**» Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=869557391920877569&scope=bot&permissions=805317695&response_type=code)",true)
  .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/VhVPJ5NAjn)",true)

 return message.channel.send(embed);
  };
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i'],
  permLevel: 0
};
 
exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};