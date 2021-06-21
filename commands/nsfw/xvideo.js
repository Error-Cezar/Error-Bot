module.exports = {
    name: "xvideo",
    aliases: "xvid",
    usage: "[string] (aka text)",
    description: "send a video from xvideo.com",
    cooldown: 5,
    async execute(message, args) {
        const client = message.client
        if (!message.channel.nsfw) return client.sendErrorEmbed(message.channel, "this channel isn't nsfw !")
        const {
            XVDL
        } = require("xvdl");
        if(!args[0]) return message.client.sendErrorEmbed(message.channel, "you need to add something to search.")
        const vid = args[0]
        const num = args.slice(vid.length)
        console

        XVDL.search(vid)
            .then(info => {
                var min = 0;
                var max = Math.floor(info.videos.length);
                var infoo = info.videos[Math.floor(Math.random() * (max - min)) + min]
                console.log(infoo.url)
                var infos = infoo.url
                // console.log(infoo.url)
                XVDL.getInfo(infos)
                    .then(inf => {
                        console.log(inf)
                        var woo = inf.streams
                        const Discord = require('discord.js');

                        // inside a command, event listener, etc.
                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle("video info")
                            .addFields({
                                name: 'likes',
                                value: inf.ratings.likes,
                                inline: true
                            }, {
                                name: 'dislikes',
                                value: inf.ratings.dislikes,
                                inline: true
                            }, {
                                name: 'comments',
                                value: inf.comments,
                                inline: false
                            })
                            .setFooter("https://xvideos.com | " + inf.url);

                        message.channel.send(exampleEmbed)
                        message.channel.send(woo.hq)
                    })
            })
            .catch(e => console.error(e));

    }
}