module.exports = {
    name: "new",
    description: "create a ticket",
    async execute(message, args) {
        const client = message.client;
        const def = client.def;

    client.TicketDB.ensure(message.guild.id, def);

    const check = client.TicketDB.get(message.guild.id, "status");
    const channelCheck = client.TicketDB.get(message.guild.id, "channel");
    const roleCheck = client.TicketDB.get(message.guild.id, "role");

    if(check === "off") return client.sendErrorEmbed(message.channel, "ticket feature is currently off !");
    if(channelCheck === "") return client.sendErrorEmbed(message.channel, "there is no ticket channel up !");
    if(roleCheck === "") return client.sendErrorEmbed(message.channel, "there is no ticket support role up !");
    if(message.channel.id !== channelCheck) return message.reply(`the current ticket channel is <#${channelCheck}>`)

    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return client.sendErrorEmbed(message.channel, "I need MANAGE_CHANNELS permission for this !")
  
    const aeiou = message.author.id;
    const reason = args[0] || "none";
    if (message.guild.channels.cache.find(c => c.name.toLowerCase() === aeiou))  return client.sendErrorEmbed(message.channel, "You already have a ticket !")

    message.guild.channels.create(aeiou, {
        type: 'text',
        reason: 'Ticket creation.',
        permissionOverwrites: [
           {
             id: message.author.id,
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          {
             id: message.client.user.id,
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: client.TicketDB.get(message.guild.id, "role"),
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
          }
        ],
      }).then(channel => {
        client.sendEmbed(channel, "Ticket created !", `reason: ${reason}`)

        const key = `${message.guild.id}-${message.author.id}`;
        // Triggers on new users we haven't seen before.
        client.TicketUser.ensure(`${message.guild.id}-${message.author.id}`, {
          user: message.author.id,
          guild: message.guild.id,
          channel: ""
        });  
        client.TicketUser.set(key, channel.id, "channel");
        })
      

    message.channel.send(`:mega: **ticket created at #${aeiou}**`)

    }
}