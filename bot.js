const Discord = require('discord.js');//
const client = new Discord.Client();//
const Settings = require('./Settings/Settings.json');//
const Other = require('./Settings/Other.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./Util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
require('discord-buttons')(client);
//

var prefix = Settings.BotSettings.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} Adet Komut Yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./Commands/${f}`);//
        log(`[+] Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(Settings.BotSettings.token);

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(Settings.BotSettings.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor."));
});
//-----------------------------------------------Komutlar------------------------------------------------\\

client.on('guildCreate', guild => {
    const bilgiEmbed = new Discord.MessageEmbed()
        .setTitle("Merhabalar ' Menthe ♥") // başlık
        .setColor('RANDOM') // renk
        .setDescription('Beni Sunucunuza Eklediğiniz İçin Teşekkürler ♥\nBenim Davet Linkim [Davet Et](https://discord.com/oauth2/authorize?client_id=869557391920877569&scope=bot&permissions=805317695&response_type=code)\nBeni Tanımak İçin Destek Sunucumuza Gelebilirsiniz [Destek Sunucum](https://discord.gg/VhVPJ5NAjn)\nMenthe İyi Kullanımlar Diler ♥') // açıklama
        .setFooter("Menthe ♥ Losint")

    if (guild.me.hasPermission('ADMINISTRATOR')) {
        guild.channels.create("menthebot", {
            type: 'text',
            topic: 'Beni eklediğin için teşekkürler! ❤',
            permissionOverwrites: [{ id: guild.id, deny: ['VIEW_CHANNEL'] }]
        }).then(c => {
            c.send(`**Beni eklediğiniz için teşekkür ederim ❤**`, bilgiEmbed)
        });
    };
});

client.on('messageDelete', async message => {// can#0002
    if(message.author.bot || !message.content) return;
    require('quick.db').push(message.guild.id, {
      author: message.author,
      authorTAG: message.author.tag,
      authorID: message.author.id,
      authorUSERNAME: message.author.username,
      authorDISCRIMINATOR: message.author.discriminator,
      messageID: message.id,
      messageCHANNEL: message.channel,
      messageCHANNELID: message.channel.id,
      messageCONTENT: message.content,
      messageCREATEDAT: message.createdAt
    });
  });