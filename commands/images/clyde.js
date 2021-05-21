module.exports = {
    name: "clyde",
    description: "send a clyde image",
    usage: "{message}",
    async execute(message, args) {
        const client = message.client
        const { MessageAttachment } = require("discord.js");
        const Canvacord = require("canvacord");

        const text = args.join(" ") || "Provide text or no clyde!";

        const data = await Canvacord.Canvas.clyde(text);
        const img = new MessageAttachment(data, "clyde.png")
        return message.channel.send(img)
    }
}