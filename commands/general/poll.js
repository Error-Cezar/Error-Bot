module.exports = {
name: "poll",
description: "create a poll.. what do you expect",
cooldown: 5,
execute(message,args) {
	const Discord = require("discord.js")
	const client = message.client
	 let poll = new Discord.MessageEmbed()
	const pollm = args[0];
	if(pollm) {
		poll.setTitle("Poll Time")
		poll.setDescription(pollm)
		poll.addField('Yes','👍',true)
		poll.addField('No','👎',true)
		poll.setTimestamp()
		poll.setFooter(`poll opened by ${message.author}`)
		message.channel.send(poll).then(sentMessage => {
	sentMessage.react('👍');
	sentMessage.react('👎');
});
	}else return message.channel.send("what do you want to be in the poll..")
		
		
}
}