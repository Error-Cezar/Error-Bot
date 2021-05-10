//Functions.js
module.exports = (client, guildConf, message) => {
	const Discord = require("discord.js")
	
	    client.checkPerms = (message, perms) => {
        return (message.member.hasPermission(perms) || client.isOwner(message));
    }
	
	    client.isOwner = (author) => {
        author = client.users.resolve(author);
        if(!author) return false;
        return (client.config.owners.includes(author.id));
    }};