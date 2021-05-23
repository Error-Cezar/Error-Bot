module.exports = {
    name: "info",
    description: "get the bot's info",
    execute(message) {
        const guild = message.guild
        const client = message.client
        const { MessageEmbed }= require("discord.js")
        const hou = (client.uptime/3,6e+6)
const inf = new MessageEmbed()
inf.setTitle("Error-Bot info");
inf.addFields(
    {name: "name", value: client.user.username},
    {name: "id", value: client.user.id},
    {name: "servers", value: client.guilds.cache.size},
    {name: "current database", value: "enmap"},
    {name: "uptime", value: hou + "h " + client.uptime/60000 + "min " + client.uptime/1000 +"s " + client.uptime +"ms"},
)
inf.setColor("RANDOM")
inf.setFooter("Error-Bot | by Error-Cezar")
inf.setTimestamp();
message.channel.send(inf);
    }
}