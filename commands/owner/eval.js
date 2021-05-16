module.exports = {
    name: 'eval',
    description: 'run funny code',
    usage: "[code]",
	async execute(message, args) {
        if(!message.author.id === '362991657236561923') return message.reply("**no.**")
			const client = message.client
            let codeArr = args.slice(0).join(" ").split("\n");

            if (!codeArr[codeArr.length - 1].startsWith("return")) {
              codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`;
            }
        
            const code = `async () => { ${codeArr.join("\n")} }`;
        
            if (!args[0]) { await client.sendErrorEmbed(message.channel, "Please put code to run"); return; }
        
            let func = eval(code);
            let evaled = await func();
        
            if (typeof evaled !== "string") {
              evaled = require("util").inspect(evaled);
            }
        
            evaled = evaled.replace(client.token, "token: cvjcshkchdzijioeqnudzesiuqioyuncroecfonecfnxenihxenxenyuxenzxnixzyxzozxnxuixeznxazgnxguaxzgbxazy,axz,xza,oixazoxeadciezcbczaaxzxnzaaxzenuxzanixzaniy");
        
            await message.channel.send(evaled, { split: true, code: "js" });

    }};