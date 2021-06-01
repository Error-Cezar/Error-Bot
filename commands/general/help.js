

module.exports = {
    name: "help",
    description: "it's help what do you expect",
    cooldown: 5,
        async execute(message, args){
            const fs = require("fs");
            const Discord = require("discord.js");
const client = message.client
            if(args[0]) {
                const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()))
const nam = cmd.name;
            
                if(cmd) {
                await client.sendEmbed(message.channel, "**help**", `Name: ${cmd.name} \n Aliases: ${cmd.aliases ? cmd.aliases : "None"} \n Description: ${cmd.description}, \nCooldown: ${cmd.cooldown ? cmd.cooldown + " Seconds" : "None"} \n Usage: ${cmd.usage ? cmd.usage : "None"}`)
                return;
            } else {
                await client.sendErrorEmbed(message.channel, "That is not a valid command or alias")
                return;
            }
        }

            let em = new Discord.MessageEmbed()
            em.setTitle('Help')
            em.setDescription('here is a list of all my cmds')
            fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
                const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
                const rfiles = files.map(x => {
                    return x.replace('.js','');
                  })
                                      em.addField(f, rfiles.join(", "), false)
            })
            em.setFooter("Error-Bot | by Error-Cezar")
            em.setColor("RANDOM")

            message.channel.send(em)
        
        }
}