module.exports = {
    name: "setconf",
    description: "change bot settings !",
    execute(message, args) {
        const client = message.client
        message.client.settings.get(message.guild.id);
		const defaultSettings = {
    prefix: "&",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
  }
const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
// Command is admin only, let's grab the admin value: 
    const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");

    // Then we'll exit if the user is not admin
    if(!message.member.roles.cache.has(adminRole.id)) {
      return message.reply("You're not an admin, sorry!");
    }
         // Let's get our key and value from the arguments. 
    // This is array destructuring, by the way. 
    const [prop, ...value] = args;
    // Example: 
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)

    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
    if(!client.settings.has(message.guild.id, prop)) {
		let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}`;
    });
      return message.reply(`Look like this key is not in the configuration.\n here is the current keys: \`\`\`${configProps.join("\n")}\`\`\``);
    }

    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, value.join(" "), prop);

    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }
    }
