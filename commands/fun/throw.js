module.exports = {
    name: "throw",
    description: "throw something at someone. *what do you expect*",
    execute(message, args) {
// getting thing setup
const client = message.client
var text = `you threw **[obj]** to **[user]**`

const object_send = [
    "cheese",
    "truck",
    "stop sign",
    "bomb",
    "plush",
    "useless comments",
    "pun",
    "deez (nuts)",
    "nugget's beep",
    "ban hammer",
    "love",
    "bad time",
    "nothing",
    "jet (ayo watch yo yet)",
    "i forgor",
    "19$",
    "your mom",
    "lack of inspiration",
    "music",
    "tiky full ass mod",
    "A.G.O.T.I.",
    "[object]",
    "your ip adres"
]
const max = object_send.length;
            const min = 0;
            const object_get = Math.floor(Math.random() * (max - min + 1)) + min
            const obj = object_send[object_get];
            if(obj === "i forgor") {
                text = "you threw uhhhhhhh [obj]."
            }

            text = text.replace("[obj]", obj);

if(!args[0]) return message.reply("You need to put the **username**, **mention** or **id** of a user. (or say me to send it to yourself.)")

if(!client.users.cache.find(u => u.username === args[0])){
}else {const woo = client.users.cache.find(u => u.username === args[0]);
    text = text.replace("[user]", woo.username);
    message.channel.send(text);
    return

}

if(!client.users.cache.find(u => u.id === args[0])){
}else {const woo = client.users.cache.find(u => u.id === args[0]);
    text = text.replace("[user]", woo.username);
    message.channel.send(text);
    return

}

if(!message.mentions.users.first()) {
}else {const woo = message.mentions.users.first();
    text = text.replace("[user]", woo.username);
    message.channel.send(text);
    return

}

if(args[0] !== "me"){ return message.reply("You need to put the **username**, **mention** or **id** of a user. (or say me to send it to yourself.)")
}else {
    text = text.replace("[user]", "yourself..?");
    message.channel.send(text);
    return

}
    }
}