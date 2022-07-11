import axios from 'axios';

import url from './api';

function listCommitments(day, config){
    return axios.get(`${url}/day?number=${day}`, config);
}

export {
    listCommitments
}