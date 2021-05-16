module.exports = {
    name: "ban",
    description: "ban a user",
    async execute(message, args) {
        const client = message.client
		const guild = message.guild
		 if (!client.checkPerms(message, "BAN_MEMBERS") && !client.checkPerms(message, "ADMINISTRATOR")) {await client.sendErrorEmbed(message.channel, `Insufficient permissions`); return;}
		const user = message.mentions.users.first()
		if(user) {
			const member = message.guild.members.cache.get(user.id)
		if(member) {
		let res = args.splice(1, args.length).join(' ');

        member.ban(res)
        .then(() => {
            // We let the message author know we were able to kick the person
           client.sendEmbed(message.channel, `Member Banned`, `
    Member: ${user}
    ID: ${user.id}
    `, [], `Reason: ${res ? res : "None"}`, "", "", "https://media1.tenor.com/images/632ef935cd49ce9789ca31c23cd42f06/tenor.gif?itemid=17553259");
          })
          
          .catch(err => { 
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            client.sendErrorEmbed(message.channel, 'I was unable to Ban the member');
            // Log the error
            console.error(err);
          });
		} else {
        // The mentioned user isn't in this guild
        client.sendErrorEmbed(message.channel, "That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      client.sendErrorEmbed(message.channel, "You didn't mention the user to Ban!");
    }
    }
}