const fs = require("fs");
const Discord = require("Discord.js");
module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    usage: "[command name]",
	execute(message, args) {
        if (message.author.id === '362991657236561923') {
			const client = message.client
			if(!args[0]) return message.channel.send("please insert a command name");
        const commandName = args[0].toLowerCase();
		 fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
    	const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
    	if (files.includes(`${commandName}.js`)) {
    		const file = `${process.cwd()}/commands/${f}/${commandName}.js`;
    		try {
    			delete require.cache[require.resolve(file)];
			  	client.commands.delete(commandName);
			  	const pull = require(file);
			  	client.commands.set(commandName, pull);
			  	client.sendEmbed(message.channel, "Successfully reloaded!", `Command: \`${commandName}.js\``);
			  	return;
    		} catch (err) {
				client.sendErrorEmbed(message.channel, "Could not reload!");
		  		console.log(err.stack || err);
		  		return;
    		}
    	}
    })
    }
},
};