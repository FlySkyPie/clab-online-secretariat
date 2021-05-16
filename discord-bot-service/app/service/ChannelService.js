import Discord from "discord.js";

import { botId, guildId } from '../config';
import SecretaryService from './SecretaryService';

//change this later
const checkPermissionRole = (name) => (name === '顧問' || name === '行政長');
/**
 * 
 * @param {Discord.Message} message 
 */
export const createContactsUpdateApplicationForm = async message => {
    if (message.channel.type !== "text") {
        return;
    }

    if (!message.member.roles.cache.some(role => checkPermissionRole(role.name))) {
        return;
    }

    //const mentionBotReg = new RegExp(`.*<@!${botId}>.*`, 'g');
    if (message.content.match(/^!Lyana /g) === null) {
        return;
    }

    if (message.content.match(/.*contacts.*/g) === null) {
        return;
    }

    /*const guild = client.guilds.cache.get(guildId);
    const member = guild.member(message.author);
    const nickname = member ? member.displayName : message.author.username;
    console.log(nickname);/***/

    const result = await SecretaryService.create('member-contacts', message.author.username);
    const responseMessage = "您的會員通訊錄更新申請表在此：\n" + '`' + result.data.link + '`';
    message.author.send(responseMessage).catch(() => { });
}

export const createOrganizationEmailApplicationForm = async message => {
    if (message.channel.type !== "text") {
        return;
    }

    if (!message.member.roles.cache.some(role => checkPermissionRole(role.name))) {
        return;
    }

    if (message.content.match(/^!Lyana /g) === null) {
        return;
    }

    if (message.content.match(/.*email.*/g) === null) {
        return;
    }

    const result = await SecretaryService.create('organization-email', message.author.username);
    const responseMessage = "您的社群信申請表在此：\n" + '`' + result.data.link + '`';
    message.author.send(responseMessage).catch(() => { });
}