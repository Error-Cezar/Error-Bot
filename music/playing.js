const scdl = require("soundcloud-downloader").default;
const { canModifyQueue } = require(`${process.cwd()}/util/SoundCloudUtil`);

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
     let collector = null;
if(!song) {
    queue.channel.leave();
    message.client.queue.delete(message.guild.id);
    return queue.textChannel.send("🚫 queue ended ! leaving the voice chat.").catch(console.error);
  }


 
  let stream = null;
  let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";


    try {   
       if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.OPUS,
            process.env.SOUND_ID ? process.env.SOUND_ID : undefined
          );
        } catch (error) {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.MP3,
            process.env.SOUND_ID ? process.env.SOUND_ID : undefined
          );
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }
      

      console.error(error);
      return message.channel.send(`Error: ${error.message ? error.message : error}`);
    }

    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    try {
     queue.textChannel.send(`Started playing: **${song.title}** ${song.url}`);
      } catch (error) {
        console.error(error);
      }


  }
}