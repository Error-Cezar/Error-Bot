module.exports = {
    name: "blur",
    description: "blur idk",
    usage: "[mention] (optional)",
    async execute(message, args) {
        const client = message.client
        const { MessageAttachment } = require("discord.js");
        const Canvacord = require("canvacord");
        var author = null;
        var image = null;
        if(message.attachments.size > 0) {
         //   if(message.attachments.first().format === `png`){//Download only png (customize this)
            image = message.attachments.first().url          
        //    }
        } else { author = message.mentions.users.first() || message.author
             image = author.displayAvatarURL({ dynamic: false, format: 'png' }); }
// console.log(image)


        const data = await Canvacord.Canvas.blur(image);
        const img = new MessageAttachment(data, "blur.png")
        return message.channel.send(img)
    }
}