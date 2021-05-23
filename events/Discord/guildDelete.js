module.exports = async (client, message) => {
    client.settings.delete(message.guild.id);
    console.log(`deleted ${message.guild.name} from the database`)
}