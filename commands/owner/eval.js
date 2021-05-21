module.exports = {
    name: 'eval',
    description: 'run funny code',
    usage: "[code]",
	async execute(message, args) {
        if(!message.author.id === '362991657236561923') return message.reply("**no.**")
			const client = message.client
      try {
        if (!args[0]) { await client.sendErrorEmbed(message.channel, "Please put code to run"); return; }
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
          evaled = evaled.replace(client.token, "[TOKEN]");
  
          await message.channel.send(evaled, { split: true, code: "js" });
      } catch (err) {
        client.sendErrorEmbed(message.channel, `${err}`);
      }  

    }};
    