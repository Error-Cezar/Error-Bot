module.exports = {
    name: "hack",
    description: "get a user data with a very complex code (real no fake 100% working 2022)",
    usage: "[user mention]",
    async execute(message) {
        const client = message.client;
		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.members.cache.get(user.id);
		if(member) {
            // value needed for hacc
            const max = 255;
            const min = 0;
            var msgedit = "";
            const ip = `${Math.floor(Math.random() * (max - min + 1)) + min}.${Math.floor(Math.random() * (max - min + 1)) + min}.${Math.floor(Math.random() * (max - min + 1)) + min}.${Math.floor(Math.random() * (max - min + 1)) + min}`;

            // message we are going to edit ae
            const msg = await message.channel.send("the real and very complex hack is starting... (can take some times)");

            msgedit = "getting user id...";
            edit();
            client.wait(2000);
            msgedit = `id fetched (${member.id})`;
            edit();
            client.wait(2000);
            msgedit = "getting user ip...";
            edit();
            client.wait(4000);
            msgedit = `fetched ip (${ip})`;
            edit();
            client.wait(1000);
            msgedit = "selling data to the darkweb for better info";
            edit();
           client.wait(5000);
           msgedit = "generating result url...";
           edit();
           client.wait(1000);
           msgedit = "url with full info generated ! https://error-bot.ga/hack-result"
           edit();

            
// edit fonction so we dont have to copy and paste the code
         function edit() {
    msg.edit(msgedit);
	}     
        }
    }

    }
}