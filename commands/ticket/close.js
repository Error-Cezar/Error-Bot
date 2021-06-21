module.exports = {
    name: "close",
    description: "close  a ticket",
    async execute(message, args) {
        const client = message.client;
        const def = client.def;

    client.TicketDB.ensure(message.guild.id, def);

    const check = client.TicketDB.get(message.guild.id, "status");
    const channelCheck = client.TicketDB.get(message.guild.id, "channel");
    const roleCheck = message.guild.roles.cache.get(client.TicketDB.get(message.guild.id, "role"));
    const key = `${message.guild.id}-${message.channel.name}`;
    const fuku =  message.client.TicketUser.get(key, "channel")
    if(!fuku) return client.sendErrorEmbed(message.channel, "This ticket dont exist !")
    if(check === "off") return client.sendErrorEmbed(message.channel, "ticket feature is currently off !");
    if(channelCheck === "") return client.sendErrorEmbed(message.channel, "there is no ticket channel up !");
    if(roleCheck === "") return client.sendErrorEmbed(message.channel, "there is no ticket support role up !");
if(message.channel.id !== client.TicketUser.get(key, "channel")) return client.sendErrorEmbed(message.channel, "this channel is not a ticket !")
if(!message.member.roles.cache.has(roleCheck.id)) return client.sendErrorEmbed(message.channel, "you are not a ticket support boi !")
    const fetchedChannel = message.member.guild.channels.cache.get(client.TicketUser.get(key, "channel"));
fetchedChannel.delete();
const channel = client.channels.cache.get(client.TicketDB.get(message.guild.id, "channel"))
channel.send(`:white_check_mark: <@${message.channel.name}> ticket closed by <@${message.author.id}>`);
client.TicketUser.set(key, "", "channel");

    }
}