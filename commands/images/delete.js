module.exports = {
    name: "delete",
    description: "delete this",
    usage: "{message}",
    async execute(message, args) {
        const client = message.client
        const { MessageAttachment } = require("discord.js");
        const Canvacord = require("canvacord");
        var author = null;
        author = message.mentions.users.first() || message.author;


        const image = author.displayAvatarURL({ dynamic: false, format: 'png' });


        const data = await Canvacord.Canvas.delete(image);
        const img = new MessageAttachment(data, "delete.png")
        return message.channel.send(img)
    }
}