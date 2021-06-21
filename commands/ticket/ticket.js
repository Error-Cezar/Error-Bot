module.exports = {
    name: "ticket",
    description: "set the ticket system to on/off",
    usage: "[on/off]",
    async execute(message, args) {
        const client = message.client;
        const def = client.def

        const checkin = [
            "on",
            "off"
        ]

        if (!client.checkPerms(message, "MANAGE_CHANNELS") && !client.checkPerms(message, "ADMINISTRATOR")) {await client.sendErrorEmbed(message.channel, `Insufficient permissions`); return;}
    
        if(args[0]) { 
            const thing = args[0];
    client.TicketDB.ensure(message.guild.id, def);

    const check = client.TicketDB.get(message.guild.id, "status");

    if(check === "off" && thing === "off") { return client.sendErrorEmbed(message.channel, `ticket system is already set to ${thing}.`)
        }
        if(check === "on" && thing === "on") { return client.sendErrorEmbed(message.channel, `ticket system is already set to ${thing}.`)
        }

        if(!checkin.includes(thing)) {
            return message.reply(`please put the setting to \`\`\`on/off\`\`\``)
           }

    client.TicketDB.set(message.guild.id, thing, "status")

    message.channel.send(`ticket system is now \`\`\`${thing}\`\`\``)

    } else return message.channel.send("uh.. do I need to turn it on or off?")
}};