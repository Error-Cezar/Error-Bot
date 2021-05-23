module.exports = {
    name: "ping",
    description: "get the bot pinging time",
    async execute(message) {
        const client = message.client
    message.channel.send("Pinging...").then((msg) => {

    const apiPing = Math.round(client.ws.ping)
    let apiPingRating = "LOW"

    if (apiPing > 1000) {
        apiPingRating = "VERY HIGH";
    } else if (apiPing > 500) {
        apiPingRating = "HIGH";
    } else if (apiPing > 300) {
        apiPingRating = "MEDIUM";
    }
    

    let ping = msg.createdTimestamp - message.createdTimestamp;
    let pingRating = "LOW"

    if (ping > 1000) {
        pingRating = "VERY HIGH";
    } else if (ping > 500) {
        pingRating = "HIGH";
    } else if (ping > 300) {
        pingRating = "MEDIUM";
    }
client.wait(ping)
    msg.edit(`Pong ! \n API Ping: ${apiPingRating}  ${apiPing} ms \n Bot Ping: ${pingRating}  ${ping} ms`)
})
    }
}