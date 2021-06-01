const { canModifyQueue, LOCALE } = require(`${process.cwd()}/util/SoundCloudUtil`);

const i18n = require("i18n");
const { common } = require(`${process.cwd()}/locales/en.json`);
const { loop } = require(`${process.cwd()}/locales/en.json`);
i18n.setLocale(LOCALE);

module.exports = {
    name: "loop",
    description: "loop the current music",
    execute(message) {
        const client = message.client
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return client.sendErrorEmbed(message.channel, "there is no music playing").catch(console.error);
        if (!canModifyQueue(message.member)) return client.sendErrorEmbed(message.channel, "you cant modify this queue");
   var resu = loop.result
   if(!queue.loop) { var res = "on" }
        if(queue.loop) { var res = "off"}
   resu = resu.replace("{loop}", res);
   
          queue.loop = !queue.loop;
          return queue.textChannel
          .send(resu)
            .catch(console.error);
    }
}