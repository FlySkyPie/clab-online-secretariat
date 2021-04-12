import Discord from "discord.js";

import { botId, guildId } from '../config';
import SecretaryService from './SecretaryService';

/**
 * 
 * @param {Discord.Message} message 
 */
export const createMailApplicationForm = async message => {
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

    /*const guild = client.guilds.cache.get(guildId);
    const member = guild.member(message.author);
    const nickname = member ? member.displayName : message.author.username;
    console.log(nickname);/***/

    const result = await SecretaryService.create('member-contacts', message.author.username);
    const responseMessage = "您的會員通訊錄更新申請表在此： " + result.data.link ;

    message.author.send(responseMessage).catch(() => { });
}