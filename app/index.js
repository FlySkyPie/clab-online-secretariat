
import Discord from "discord.js";

const token = process.env.BOT_TOKEN;
const botId = process.env.BOT_ID;

console.log(token);
console.log(botId);

/**
 * 
 * @param {Discord.Message} message 
 */
const createMailApplicationForm = message => {
    if (message.channel.type !== "text") {
        return;
    }

    //change this later
    if (!message.member.roles.cache.some(role => role.name === '顧問')) {
        return;
    }

    const mentionBotReg = new RegExp(`.*<@!${botId}>.*`, 'g');
    if (message.content.match(mentionBotReg) === null) {
        return;
    }

    if (message.content.match(/.*mail.*/g) === null) {
        return;
    }

    console.log('mention mail')
}

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    createMailApplicationForm(msg);
});

client.login(token);

