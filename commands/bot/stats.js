module.exports = {
    name: "stats",
    description: "bot stats",
    execute(message) {
        const Discord = require("discord.js");
        const pack = require(`${process.cwd()}/package.json`);
        var dep = pack.dependencies;
        var systeminf = pack.dependencies;
        console.log(systeminf)
        // systeminf =  systeminf.replace('^', 'v');
        dep = JSON.stringify(dep);
        dep =  dep.replace(',', '\n');
        dep = dep.replace('{', ' ');
        dep = dep.replace('}', ' ');

        let embed = new Discord.MessageEmbed;
        embed.setAuthor(message.author.username);
        embed.setTitle("Error-Bot stats");
        embed.addFields(
            {name: "Name", value: pack.name, inline: true },
            {name: "Version", value: pack.version, inline: true },
            {name: "System", value: `\`\`\`node: ${process.version} \n discordjs: ${systeminf["discord.js"]} \n mongoDB API: ${systeminf.mongoose} \n soundcloud API: ${systeminf["soundcloud.ts"]} \n soundcloud downloader: ${systeminf["soundcloud-downloader"]}\`\`\``, inline: false },
            {name: "Author", value: pack.author, inline: true },
        )
        embed.setTimestamp();
        embed.setColor("RANDOM")
        message.channel.send(embed)



    }
}