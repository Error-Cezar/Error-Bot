const {
  play
} = require(`${process.cwd()}/music/playing`);

const scdl = require('soundcloud-downloader').default;
const fetch = require("node-fetch");
const fs = require('fs')

module.exports = {
  name: "play",
  description: "play a music from soundcloud",
  aliases: "p",
  async execute(message) {
    const {
      channel
    } = message.member.voice;

    const CLIENT_ID = process.env.SOUND_ID

    var Soundcloud = require("soundcloud.ts");
    const soundcloud = new Soundcloud();


    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("I cant connect to this voice chat");
    if (!permissions.has("SPEAK"))
      return message.reply("I cant speak here..");

    const url = message.content.split(" ").slice(1).join(' ')
    if (!url) return message.reply('please put a url or search')
    const check = scdl.isValidUrl(url)
    if (!check) {
      const search = await soundcloud.tracks.search({q: url})
      message.channel.send("ae")
      return console.log(search)
    }


    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songInfo = null;
    let song = null;



    const trackInfo = await scdl.getInfo(url, CLIENT_ID);
    song = {
      title: trackInfo.title,
      url: trackInfo.permalink_url,
      duration: Math.ceil(trackInfo.duration / 1000)
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
        .catch(console.error);
    }


    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);


    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
    }


  }
}