const Discord = require('discord.js');
const githubUser = require('github-api-user');

exports.run = async (bot, message, args) => {
  var ghName = args.slice(0).join(' ')

  if (ghName.length < 2) {
    const lengtherr = new Discord.MessageEmbed()
      .setColor('0xFF0000')
      .setTitle('HATA')
      .setDescription('Kullanıcı İsmi Çok Kısa !')

    return message.channel.send(lengtherr)
  }

  const githubprofili = new Discord.MessageEmbed()
    .setColor('0xFF0000')
    .setTitle('HATA')
    .setDescription('Kullanıcı Bulunamadı, Lütfen Başka Bir İsim Deneyiniz !')

  githubUser(`${ghName}`).then(user => {
    console.log(`Aranan Github Profili | ${ghName} | ${user.name}`)
    if (user.name == null) {
      var ghnamee = 'İsim Bulunamadı !'
    } else {
      var ghnamee = user.name
    }
    if (user.company == null) {
      var ghcompany = 'Şehir Bulunamadı !'
    } else {
      var ghcompany = user.company
    }
    if (user.location == null) {
      var ghlocation = 'Lokasyon Bulunamadı !'
    } else {
      var ghlocation = user.location
    }
    if (user.mail == null) {
      var ghmail = 'Mail Bulunamadı !'
    } else {
      var ghmail = user.mail
    }
    if (user.bio == null) {
      var ghbio = 'Bio Bulunamadı !'
    } else {
      var ghbio = user.bio
    }
    const profile = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Github Profil`) // rexulec
      .setURL(`https://github.com/${ghName}`)
      .setAuthor(`${ghName}'s`, user.avatar_url, `https://github.com/${ghName}`)
      .setThumbnail(user.avatar_url)
      .addFields({
        name: 'İsim',
        value: ghnamee,
        inline: true
      }, {
        name: 'Şirket',
        value: ghcompany,
        inline: true
      }, {
        name: 'Lokasyon',
        value: ghlocation,
        inline: true
      }, {
        name: 'Mail',
        value: ghmail,
        inline: true
      }, {
        name: 'Biografi',
        value: ghbio,
        inline: true
      }, )
      .setTimestamp()
      .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.displayAvatarURL({
        dynamic: true,
        size: 4096,
        format: 'png'
      }));

    message.channel.send(profile)

  }).catch(err => message.channel.send(githubprofili));;

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["github"]
  };
  
  module.exports.help = {
    name: 'github'
  };