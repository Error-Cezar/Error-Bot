module.exports = {
    name: "give",
    description: "send cmd used to give what you want (for minecraft java 1.14+)",
    usage: "[item-name] | [enchant-level] | [enchant-name] (enchant are optional)",
    cooldown: 5,
    execute(message, args) {
const CmdImput = `[Item-Name]{Enchantments: [{lvl: [level], id: "[enchantment name/id]"}]}`
var output = `/give @s minecraft:[item_name]{Enchantments: [{lvl: [item_level]s, id: "minecraft:[enchant_id]"}]}`

        const client = message.client;
if(!args[0]) return client.sendErrorEmbed(message.channel, `here is the input for the command \n` + CmdImput)

let things = args.join(' ').split(' | ');
console.log(args)
let result = "";
console.log(things.length)
// check for 2nd value
if(things.length == 2 & isNaN(args[2])) return client.sendErrorEmbed(message.channel, "the level isn't a valid number")
if(things.length == 2) return client.sendErrorEmbed(message.channel, "you forgot the enchantment name/id")

result = things.map((c, i) => {
return `${c}`
});

// change output if needed
if(things.length == 1) {
    output = `/give @s minecraft:[item_name]`
}


output = output.replace("item_name", result[0]);

if(things.length > 1) {
    output = output.replace("item_level", result[1]);
    output = output.replace("enchant_id", result[2]);
}

output = output.replace(`[${result[0]}]`, result[0])
output = output.replace(`[${result[1]}]`, result[1])
output = output.replace(`[${result[2]}]`, result[2])

message.channel.send("here is your command ! \n" + `\`\`\`${output}\`\`\``)
    }
}