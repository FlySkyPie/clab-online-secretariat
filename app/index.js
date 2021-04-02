import Discord from "discord.js";

import InternalService from "./service/InternalService";

const token = process.env.BOT_TOKEN;
const botId = process.env.BOT_ID;

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
const internalService = new InternalService();

internalService.onAnnounce(() => {
    client.channels.cache
        .get('820795489564753941')
        .send('this message are triggered by post');
});/***/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    //console.log(message.channel);
    createMailApplicationForm(message);
});

client.login(token);
