import Discord from "discord.js";

import AnnounceService from "./service/AnnounceService";
import { createMailApplicationForm } from './service/ChannelService';
import { token, secretariatChannelId, guildId } from './config';

const client = new Discord.Client();
const internalService = new AnnounceService();

internalService.onAnnounce((message) => {
    client.channels.cache
        .get(secretariatChannelId)
        .send(message);
});/***/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    createMailApplicationForm(message);
});

client.login(token);
