import axios from 'axios';
import json from './api.json';

let url = "http://localhost/";

axios.get(json).then(result => {
    url = result.data.url;
});

export default {
    install: (Vue) => {
        Vue.prototype.$fetch = function (path, payload) {
            return axios.post(url + path, JSON.stringify(payload));
        }
    },
};

