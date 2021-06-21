module.exports = {
    name: "help",
    description: "it's help what do you expect",
    cooldown: 5,
    async execute(message, args) {
        const fs = require("fs");
        const Discord = require("discord.js");
        const client = message.client
        if (args[0]) {
            const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()))
            const nam = cmd.name;

            if (cmd) {
                await client.sendEmbed(message.channel, "**help**", `Name: ${cmd.name} \n Aliases: ${cmd.aliases ? cmd.aliases : "None"} \n Description: ${cmd.description}, \nCooldown: ${cmd.cooldown ? cmd.cooldown + " Seconds" : "None"} \n Usage: ${cmd.usage ? cmd.usage : "None"}`)
                return;
            } else {
                await client.sendErrorEmbed(message.channel, "That is not a valid command or alias")
                return;
            }
        }
        const disbut = require('discord-buttons');
        let btn = new disbut.MessageButton()
            .setLabel('Support server')
            .setStyle('url')
            .setURL('https://discord.gg/tYwnHCme4W');

        let btn2 = new disbut.MessageButton()
            .setLabel('Source code')
            .setStyle('url')
            .setURL('https://github.com/Error-Cezar/Error-Bot');

        let row = new disbut.MessageActionRow()
            .addComponent(btn)
            .addComponent(btn2);
        var ae
        let em = new Discord.MessageEmbed()
        em.setTitle('Help')
        em.setDescription('here is a list of all my cmds')
        fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
            const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
            var rfiles = files.map(x => {
                return x.replace('.js', '');
            })
            ae = 0
            
 em.addField(f, rfiles.join(", "), false) 
            
            // console.log(ae)
        })
        em.setFooter("Error-Bot | by Error-Cezar")
        em.setColor("RANDOM")

        message.channel.send({
            component: row,
            embed: em
        })

    }
}