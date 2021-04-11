import axios from 'axios';

const config = {
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

const url = "http://localhost:3020/announcement";

export const announce = (message) => {
    return axios.post(
        url,
        JSON.stringify({ message }),
        config);
}