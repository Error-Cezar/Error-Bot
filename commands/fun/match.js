

module.exports = {
    name: "match",
    description: "wip",
    cooldown: 60,
    usage: "[user mention]",
    async execute(message, args) {
        const client = message.client
        if(client) return client.sendErrorEmbed(message.channel, "this command is still in progress")
        var bot = 1
        var go = 0
        if(args[0]){const user = message.mentions.users.first()
            var bot = 0 }

        
        if(bot = 1) {
            message.channel.send('rules: you must have a bigger number than your enemy. you will have 6 seconds to put your numbers in my dms. \n easy right?')
 .then(async function (message) {
     const time = 10000
                        const filter = (reaction, user) => {
                             return reaction.emoji.name === '✅' && user.id === message.author.id;
                        };
                  
                        const collector = message.createReactionCollector(filter, { time: time });
                //   
                        collector.on('collect', (reaction, reactionCollector) => {
                            var go = 1
                            console.log("h")
                        });
                   });
             if(go = 1) {
                const msg = await message.channel.send('loading...')

                client.wait(3000).then(() => {msg.edit("get real")})
             }
        }
    }
}