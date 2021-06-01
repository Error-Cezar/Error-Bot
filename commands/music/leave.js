const { canModifyQueue } = require(`${process.cwd()}/util/SoundCloudUtil`);

module.exports = {
    name: "leave",
    description: "leave the voice chat",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return client.sendErrorEmbed(message.channel, "there is no music playing").catch(console.error);
        if (!canModifyQueue(message.member)) return client.sendErrorEmbed(message.channel, "you cant modify this queue");
    

        queue.channel.leave();
    message.client.queue.delete(message.guild.id);
    return queue.textChannel.send("bye :wave:").catch(console.error);
    }
}