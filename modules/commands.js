const fs = require("fs");

module.exports = (client) => {

    client.reloadCommand = (command) => {
        if (!client.commands.get(command)) return false
        try {
            client.modules.forEach(c => {
                fs.readdir(`./commands/${c}/`, (err, files) => {
                    if (err) throw err;
                    files.forEach(f => {
                        let commandName = f.split(".")[0];
                        if (commandName === command) {
                            // delete old
                            delete require.cache[require.resolve(`./commands/${c}/${commandName}.js`)];
                            client.commands.delete(commandName);
                            // load new
                            const props = require(`./commands/${c}/${commandName}.js`);
                            client.commands.set(commandName, props);

                        }
                    });
                });
            });
        } catch(e) {
            return false;
        }
        console.log(`Reloaded command: ${command}`);
        return true;
    }
}