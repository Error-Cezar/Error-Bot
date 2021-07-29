module.exports = {
    name: "anime",
    description: "fetch a random anime pfp from safebooru.donmai.us (WARNING: The api is not the best so dont expect insane thing *it's better than nothing*)",
    async execute(message) {
        // if(message.author.id !== "362991657236561923") return message.channel.send("the current api used is trash so come back when a new one is found ok")
        const fetch = require('node-fetch');
        let url = 'https://safebooru.donmai.us/post/index.json?limit=1&id=random&rating=s'
        let settings = { method: "Get" };

        fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
               message.client.sendEmbed(message.channel, `image n°${json[0].id} generated | image format is jpg (sorry cant change it)`, `source: ${json[0].source} <-- better resolution`, "", "", "", "",json[0].preview_url)
            });
    }
}