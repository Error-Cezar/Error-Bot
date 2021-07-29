module.exports = {
    name: "phub",
    aliases: "ph",
    description: "create a ph comment",
    usage: "{message}",
    async execute(message, args) {
        const client = message.client
        const { MessageAttachment } = require("discord.js");
        const Canvacord = require("canvacord");
const phmessage = args[0] || "*insert message here*";
const image = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const data = await Canvacord.Canvas.phub({ username: message.author.username, message: phmessage, image: image });
        const img = new MessageAttachment(data, "ph.png")
        return message.channel.send(img)
    }
}