import axios from 'axios';

import { serviceURI } from '../config';

const config = {
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

/**
 * 
 * @param {string} type 
 * @param {string} applicant 
 * @returns {Promise<AxiosResponse<any>>}
 */
const create = (type, applicant) => {
    return axios.post(
        serviceURI + "/application-form/create",
        JSON.stringify({ type, applicant }),
        config);
}

export default{
    create
};