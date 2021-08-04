const Discord = require ("discord.js");
const hastebin = require('hastebin-gen');
const { MessageButton } = require('discord-buttons');
exports.run = (bot, message) => {
    
    var embed = new Discord.MessageEmbed()
  .setTitle("Wasted")
  .setColor("#f45f42")
  .addField(`${message.author} Oy sen büyüdünde botun açığını mı arıyorsun ♥`)
  .setFooter(`Menthe ♥ Losint`)
		
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args = message.content.split(" ").slice(1);
  const args2 = message.content.split(' ').slice(1).join(' ');
  
    try {
         var authors = ["812782699348492308"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embed});
    return;
    }
    
    if (!args2) {
      message.channel.send("Bir Kod Gir.");
      return;
  }
  

        const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")	
        evaled = require("util").inspect(evaled);

        if (clean(evaled).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nÇıktı: \n\n${clean(evaled)}`, "js").then(r => {
          var embed3 = new Discord.MessageEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#ffff66")
          .addField("Bu Kod Fazla Uzun Senin İçin Hastebine Koydum")
          const button = new MessageButton()
          .setLabel('Çıktı')
          .setStyle('url')
          .setURL(r);
        
          return message.channel.send({ embed: embed3, component: button });
})} else {
        var embed2 = new Discord.MessageEmbed()
        .setColor("#00ced1")
        .setDescription(`Çıktı\n\`\`\`js\n${clean(evaled)}\n\`\`\``)
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if (clean(err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${clean(err)}`, "js").then(r => {
          var embed3 = new Discord.MessageEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#f44242")
          .addField("Komutta bir hata buldum.")
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.MessageEmbed()
      .setColor("#f44242")
      .addField(":outbox_tray:", `\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
}
exports.conf = {aliases: []}
exports.help = {
    name: "eval",
    description: "discordJS eval komutu",
    usage: "<prefix>eval <code>",
}