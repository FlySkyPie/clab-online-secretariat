import axios from 'axios';

import { discordURI } from '../config';

const config = {
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

export const announce = (message) => {
    return axios.post(
        discordURI + "/announcement",
        JSON.stringify({ message }),
        config);
}