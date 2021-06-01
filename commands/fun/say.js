

module.exports = {
	name: "say",
	description: "make me talk",
	cooldown: 6,
	execute(message){
		const Discord = require("discord.js")
		const MSG = message.content.split(" ").slice(1).join(' ')
		const emb = new Discord.MessageEmbed();
		emb.setColor('RANDOM')
		emb.setTitle("new message")
		emb.setDescription(MSG)
		emb.setTimestamp()
		emb.setFooter(message.author.username)
		if(!MSG) return message.reply("I think you forget something lmao")
			message.delete();
		message.channel.send(emb)
	}
	}