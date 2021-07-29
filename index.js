const Discord = require('discord.js');
require('dotenv').config();
const Enmap = require('enmap');
const fs = require("fs");
const mongoose = require("mongoose");

// Set mobile status
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";

// Create client
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);

client.queue = new Map();
client.clink = new Map();
client.lang = [
    "en",
    "fr",
]

client.log = [
    "on",
    "off",
]

// DataBase setup
client.settings = new Enmap({
    name: "users",
    fetchAll: true,
    autoFetch: true,
    dataDir: "./db/bot/",
    cloneLevel: 'deep'
});

client.webDB = new Enmap({
    name: "users",
    fetchAll: true,
    autoFetch: true,
    dataDir: "./db/servers/",
    cloneLevel: 'deep'
});

client.TicketDB = new Enmap({
    name: "ticket",
    fetchAll: true,
    autoFetch: true,
    dataDir: "./db/ticket/",
    cloneLevel: 'deep'
});
client.def = {
    channel: "",
    status: "off",
    role: "",
        }

        client.TicketUser = new Enmap({
            name: "ticket2",
            fetchAll: true,
            autoFetch: true,
            dataDir: "./db/ticket2/",
            cloneLevel: 'deep'
        });

const defaultSettings = {
    prefix: "&",
    language: "en",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"


}

const defaultDB = {
    commandsrun: 0
}

client.slang = "";

client.on("ready", message => {
    console.log('bot ready !');
    setInterval(function(){ 
        const stats = [
            "&help",
            "error-bot.ga",
        ]
        var min = 0;
        var max = Math.floor(stats.length);
        var stat = stats[Math.floor(Math.random() * (max - min)) + min]
    client.user.setActivity(`${stat} | im pro`, {
        type: 'WATCHING'
    });
}, 1000);
});

// mongoDB connection


//  mongoose.connect(process.env.MONGODB_SRV, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// }).then(() => [
//     console.log("connect to mongoDB via mongoose !")
// ])

// client.db = mongoose.connection;

// Gets all directories in the main folder - Only goes 1 down cannot find subfolders of subfolders
function getDirectories() {
    return fs.readdirSync('./commands').filter(function subFolder(file) {
        return fs.statSync('./commands/' + file).isDirectory();
    });
}
// Creates new discord collectoin
client.commands = new Discord.Collection();
// Reads normal .js files in the main dir
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Loops through all the folders in the main dir and finds those with a .js extension
for (const folder of getDirectories()) {
    const folderFiles = fs.readdirSync('./commands/' + folder).filter(file => file.endsWith('.js'));
    for (const file of folderFiles) {
        console.log(`${file} loaded`)
        commandFiles.push([folder, file]);
    }
}
// Takes the two different command and folder lists and requires all the commands into an array which then puts it into the collection
for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(`./commands/${file[0]}/${file[1]}`);
    } else {
        command = require(`./commands/${file}`);
    }
    client.commands.set(command.name, command);
}

//Loads commands categories
client.modules = [
    "general",
    "mod",
    "among us",
    "owner",
    "fun"
]

// Load modules
fs.readdir(`./modules/`, (err, files) => {
    if (err) {
        throw err
    }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        console.log(`loaded ${file}`)
        require(`./modules/${file}`)(client);
    }
});

// loads config.js
config = require(`${process.cwd()}/config.js`);
client.config = config;
console.log(`loaded config.js`)

//Loads Events
fs.readdir(`${process.cwd()}/events/Discord/`, (err, files) => {
    if (err) {
        throw err
    }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        let event = require(`${process.cwd()}/events/Discord/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`${process.cwd()}/events/Discord/${file}`)];
    }
});


// This executes when a member joins.
client.on("guildMemberAdd", member => {

    // First, ensure the settings exist
    client.settings.ensure(member.guild.id, defaultSettings);

    // First, get the welcome message using get: 
    let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

    // Our welcome message has a bit of a placeholder, let's fix that:
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

    // we'll send to the welcome channel.
    member.guild.channels.cache
        .find(channel => channel.name === client.settings.get(member.guild.id, "welcomeChannel"))
        .send(welcomeMessage)
        .catch(console.error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on("guildDelete", guild => {
    // When the bot leaves or is kicked, delete settings to prevent stale entries.
    client.settings.delete(guild.id);
    console.log(`deleted ${guild.name} from the database`)
});

client.on("guildCreate", guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has("SEND_MESSAGES"))
    client.sendEmbed(channel, "New bot joined", "woo thanks for adding me here \n my prefix is & or @Error-Bot \n you can get help by doing &help")

});



try {
    client.login();
} catch (e) {
    console.error(`Invalid token: ${e}`);
    return;
}