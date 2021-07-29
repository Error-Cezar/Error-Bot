const { loc } = require(`${process.cwd()}/events/Discord/message.js`);
console.log(loc)
const { description } = ""

module.exports = {
    name: "info",
    description: "get bot info",
    execute(message) {
        const client = message.client;
        const guild = message.guild
        const { MessageEmbed }= require("discord.js")
        const hou = (client.uptime/3,6e+6)
const inf = new MessageEmbed()
inf.setTitle("Error-Bot info");
inf.addFields(
    {name: "name", value: client.user.username},
    {name: "id", value: client.user.id},
    {name: "servers", value: client.guilds.cache.size, inline: true},
    {name: "users", value: client.users.cache.size, inline: true},
    {name: "current database", value: "enmap"},
    {name: "uptime", value: hou + "h " + client.uptime/60000 + "min " + client.uptime/1000 +"s " + client.uptime +"ms"},
)
inf.setColor("RANDOM")
inf.setFooter("Error-Bot | by Error-Cezar")
inf.setTimestamp();
message.channel.send(inf);
    }
}