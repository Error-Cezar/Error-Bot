module.exports = {
    name: "ticket-role",
    description: "ae",
    aliases: "t-role",
    execute(message, args) {
        const client = message.client;
        const def = client.def;
        
        if(!args[0]) return client.sendErrorEmbed(message.channel, "please insert a role");

        var ae = args[0];
ae = ae.replace("<@&", "");
ae = ae.replace(">", "");

if(args[0] === "remove") {
    client.TicketDB.set(message.guild.id, "", "role")
    return message.channel.send(`:x: ticket support role removed`)
    }

if( !message.guild.roles.cache.get(ae) ) return client.sendErrorEmbed(message.channel, "this role doesnt exist \n please try to mention a role")

client.TicketDB.ensure(message.guild.id, def);

const check = client.TicketDB.get(message.guild.id, "status");

if(check === "off") return client.sendErrorEmbed(message.channel, "ticket feature is currently off \n you can turn it on with \n &ticket on")

client.TicketDB.set(message.guild.id, ae, "role")

message.channel.send(":question: ticket support role added !")

}
} 