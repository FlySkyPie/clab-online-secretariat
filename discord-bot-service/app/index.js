import Discord from "discord.js";

import AnnounceService from "./service/AnnounceService";
import SecretaryService from './service/SecretaryService';
import { token, botId } from './config';


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
const internalService = new AnnounceService();

internalService.onAnnounce((message) => {
    client.channels.cache
        .get('820795489564753941')
        .send(message);
    //.send('this message are triggered by post');
});/***/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    /*client.users.fetch(message.author.id, false).then((user) => {
        user.send('heloo');
    });/**/

    message.author.send("Your message here.").catch(()=>{});

    //console.log(client.guilds.cache.get(guildId).member(message.author));
    //console.log(message.channel.recipient);
    /*lient.guilds.cache.get(guildId).member
    const guild = client.guilds.cache.get(guildId)
    console.log(guild.members.cache);
    console.log(message);/**/
    /*const findguildroles = guild.roles.cache.forEach(item => {
        console.log(item.name);
        console.log(item.members);
    });/**/

    //console.log(message.channel);
    createMailApplicationForm(message);
});

client.login(token);
