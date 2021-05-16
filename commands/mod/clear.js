module.exports = {
name: "clear",
description: "clear some messages",
usage: "[number]",
async execute(message, args) {
    const client = message.client
    if (!client.checkPerms(message, "MANAGE_MESSAGES") && !client.checkPerms(message, "ADMINISTRATOR")) {await client.sendErrorEmbed(message.channel, `Insufficient permissions`); return;}
const num = args[0];
if(!num) return client.sendErrorEmbed(message.channel, "you need to put a number or something like that.")
message.delete();
if(isNaN(num)) return client.sendErrorEmbed(message.channel, "this value isn't a valid number !")

message.channel.bulkDelete(num).then(() => {
    client.sendEmbed(message.channel, "Message Deleted",`I have deleted Deleted ${num} messages !`, "", `deleted by ${message.author.username}`)}) 
    .catch(err => {
        // An error happened
        client.sendErrorEmbed(message.channel, err)
        // Log the error
        console.error(err);
      });
}
}