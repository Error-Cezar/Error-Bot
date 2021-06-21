module.exports = {
    name: "set-ticket",
    description: "set the ticket creation channel",
    usage: "[channel id]",
    async execute(message, args) {
        const client = message.client;
        const def = client.def;

        if (!client.checkPerms(message, "MANAGE_CHANNELS") && !client.checkPerms(message, "ADMINISTRATOR")) {await client.sendErrorEmbed(message.channel, `Insufficient permissions`); return;}

        if(!args[0]) return message.reply("please set a channel id")
        var ae = args[0];
        ae = ae.replace("<@&", "");
        ae = ae.replace(">", "");
    client.TicketDB.ensure(message.guild.id, def);

    const check = client.TicketDB.get(message.guild.id, "status");

    if(check === "off") return client.sendErrorEmbed(message.channel, "ticket feature is currently off \n you can turn it on with \n &ticket on")
    
    if(args[0] === "remove") {
    client.TicketDB.set(message.guild.id, "", "channel")
    return message.channel.send(`:x: ticket channel removed`)
    }

    if (message.guild.channels.cache.find(c => c.id.toLowerCase() === ae)) {
   client.TicketDB.set(message.guild.id, ae, "channel")
   message.channel.send(`:mega: **ticket channel is now set to <#${ae}>**`)
    } else return client.sendErrorEmbed(message.channel, "This channel doesn't exist")

    }
}