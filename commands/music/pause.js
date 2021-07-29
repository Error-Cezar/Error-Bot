const { canModifyQueue } = require(`${process.cwd()}/util/SoundCloudUtil`);

module.exports = {
    name: "pause",
    description: "pause the current music",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return client.sendErrorEmbed(message.channel, "there is no music playing").catch(console.error);
        if (!canModifyQueue(message.member)) return client.sendErrorEmbed(message.channel, "you cant modify this queue");
        const lcheck = message.client.clink.get(message.guild.id)
    if(lcheck) {
      if(!message.client.mcheck(message, message.channel.id)) return message.reply("im linked to " + "<#" + lcheck + ">")
            }
        if (queue.playing) {
          queue.playing = false;
          queue.connection.dispatcher.pause(true);
          return queue.textChannel
            .send("queue paused")
            .catch(console.error);
        }
    }
}