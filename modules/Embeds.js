const discord = require('discord.js');

module.exports = (client, guildConf, message) => {
	client.sendEmbed = (channel, title, description, fields, footer, color, thumbnail, image) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    image: { url: image || "" },
                    color: color || client.config.embed.color,
                    footer: { text: footer || client.config.embed.footer}
                }
            }).then(message => {
                resolve(message);
                return message;
            }).catch(err => {
                reject(err);
            });
        });
    }
	
	client.sendErrorEmbed = (channel, error) => {
		return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: ":x: ERROR :x:",
                    description: `\`\`\`${error}\`\`\``,
                    color: client.config.embed.color,
                }
            }).then(message => {
                resolve(message);
                return message;
            }).catch(err => {
                reject(err);
            });
        });
    }
		
}