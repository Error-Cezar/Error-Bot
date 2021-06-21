const Discord = require('discord.js');
require('dotenv').config();
const fs = require("fs")
const mongoose = require("mongoose");

const cooldowns = new Discord.Collection();
module.exports = async (client, message) => {
	//Returns nothing if there is no command
	const defaultSettings = {
    prefix: "&",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
  }
  const defaultDB = {
	  commandsrun: 0
  }
  if(message.channel.type !== 'text') return
const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
const prefix = guildConf.prefix;
const webdata = client.webDB.ensure(client.user.id, defaultDB);
const runs = webdata.commandsrun;
const Out = runs + 1;
var debug = webdata.commandsrun;

    
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	if(!commandName) return
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;
    
		if (command.name && message.channel.type !== 'text') {
			return
		}
	
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
var loc = "";
	client.slang = client.settings.get(message.guild.id, "language");
	if(client.slang == "en") {
		exports.loc = `${process.cwd()}/locales/en.json`
	}
	if(client.slang == "fr") {
		exports.loc = `${process.cwd()}/locales/fr.json`
	}


	try {
		command.execute(message, args, client);
		client.webDB.set(client.user.id, Out, "commandsrun")
		//var Tank = require(`${process.cwd()}/model.js`);
		//var NewTank = new Tank({
		//	num: Out
		//})

//		  mongoose.connect(process.env.MONGODB_SRV, {
	//		useNewUrlParser: true,
		//	useUnifiedTopology: true,
			//useFindAndModify: false,
	//	})	

		
	//	NewTank.save( function (err, small) {
		//	if (err) return console.log(err);
			//console.log("Saved!")
	//	  });

  //setTimeout(function() {
//	cleanup();
 // }, 2000);

 // Tank.deleteMany({ num: { $lt: Out } }).then(function(){
	// Success
//}).catch(function(error){
	//console.log(error); // Failure
//});

  //function cleanup() {
   // mongoose.disconnect();
	
//}



		debug = webdata.commandsrun;
		//console.log(debug)
	} catch (error) {
		console.error(error);
		message.reply(' there was an error trying to execute that command!');
	}
}