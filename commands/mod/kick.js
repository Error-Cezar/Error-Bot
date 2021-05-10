const Discord = require("discord.js");

module.exports = {
	name: "kick",
	description: "kick a member",
	async execute(message, args) {
		const client = message.client
		const guild = message.guild
		 if (!client.checkPerms(message, "KICK_MEMBERS") && !client.checkPerms(message, "ADMINISTRATOR")) {await client.sendErrorEmbed(message.channel, `Insufficient permissions`); return;}
		const user = message.mentions.users.first()
		if(user) {
			const member = message.guild.members.cache.get(user.id)
		if(member) {
		let res = args.splice(1, args.length).join(' ');

        member.kick(res)
		 .then(() => {
            // We let the message author know we were able to kick the person
           client.sendEmbed(message.channel, `Member Kicked`, `
    Member: ${user}
    ID: ${user.id}
    `, [], `Reason: ${res ? res : "None"}`, "", "", "https://media1.tenor.com/images/ca1bad80a757fa8b87dacd9c051f2670/tenor.gif?itemid=11029651");
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
		} else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
}};