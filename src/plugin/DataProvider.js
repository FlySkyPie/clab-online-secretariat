import axios from 'axios';
import json from './api.json';

const config = {
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

let url = "/";

axios.get(json).then(result => {
    url = result.data.url;
});

export default {
    install: (Vue) => {
        Vue.prototype.$fetch = function (path, payload) {
            return axios.post(
                url + path,
                JSON.stringify(payload),
                config);
        }
    },
};

