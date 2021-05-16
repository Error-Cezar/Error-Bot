module.exports = {
	name: "embed",
	description: "send a full custom embed",
	cooldown: 3,
	execute(message){
		const client = message.client
		const MSG = message.content.split(" ").slice(1).join(' ')
		if(!MSG) return message.reply("I think you forget something lmao")
		client.sendEmbed(message.channel, message.author.username, MSG, "", "", "RANDOM")
	}};