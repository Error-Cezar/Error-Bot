module.exports = {
    name: "xvideo",
    aliases: "xvid",
    description: "what is this",
    cooldown: 5,
    async execute(message, args) {
        const client = message.client
        if(!message.channel.nsfw) return client.sendErrorEmbed(message.channel, "this channel isn't nsfw !")
        const { XVDL } = require("xvdl");
        const url = args[0]

       message.channel.send("sorry, the command you are trying the execute can not be use because of a bug in the xvideo package \n this command will be avaible when the bug will be fixed. \n in short no nsfw for you")
    }
}