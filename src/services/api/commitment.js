import axios from 'axios';

import url from './api';

function listCommitments(day, config){
    return axios.get(`${url}/commitment/day?number=${day}`, config);
}

function postCommitment(info, config){
    return axios.post(`${url}/commitment`, info, config);
}

export {
    listCommitments,
    postCommitment
}