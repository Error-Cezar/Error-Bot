module.exports = {
  name: "now-playing",
  aliases: "np",
  description: "info about the current music",
  execute(message) {
    const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

const { LOCALE } = require(`${process.cwd()}/util/SoundCloudUtil`);
const { nowplaying } = require(`${process.cwd()}/locales/en.json`);
console.log(nowplaying)
const i18n = require("i18n");
const client = message.client;
i18n.setLocale(LOCALE);

      const queue = message.client.queue.get(message.guild.id);
      if (!queue) return client.sendErrorEmbed(message.channel, "there is no music playing").catch(console.error);

      const song = queue.songs[0];
      const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
      const left = song.duration - seek;
  
      let nowPlaying = new MessageEmbed()
      .setTitle(nowplaying.embedTitle)
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("#F8AA2A")
      .setAuthor(message.client.user.username);

    if (song.duration > 0) {
      nowPlaying.addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar.filledBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          "]" +
          (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );
      
}

    return message.channel.send(nowPlaying);
  }
}