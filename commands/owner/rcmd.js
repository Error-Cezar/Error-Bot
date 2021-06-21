const fs = require("fs");
const Discord = require("discord.js");
module.exports = {
    name: 'rcmd',
    description: 'Reloads all commands',
	execute(message, args) {
        if (message.author.id === '362991657236561923') {
			const client = message.client
			function getDirectories() {
				return fs.readdirSync(`${process.cwd()}/commands`).filter(function subFolder(file) {
					return fs.statSync(`${process.cwd()}/commands/` + file).isDirectory();
				});
			}
			// Reads normal .js files in the main dir
			let commandFiles = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith('.js'));
			// Loops through all the folders in the main dir and finds those with a .js extension
			for (const folder of getDirectories()) {
				const folderFiles = fs.readdirSync(`${process.cwd()}/commands/` + folder).filter(file => file.endsWith('.js'));
				for (const file of folderFiles) {
					commandFiles.push([folder, file]);
				}
			}
			// Takes the two different command and folder lists and requires all the commands into an array which then puts it into the collection
			for (const file of commandFiles) {
				let command;
				if (Array.isArray(file)) {
					command = require(`${process.cwd()}/commands/${file[0]}/${file[1]}`);
				} else {
					command = require(`${process.cwd()}/commands/${file}`);
				}
				client.commands.set(command.name, command);
			}
    }
},
};