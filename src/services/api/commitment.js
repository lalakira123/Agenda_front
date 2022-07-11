import axios from 'axios';

import url from './api';

function listCommitments(day, config){
  return axios.get(`${url}/commitment/day?number=${day}`, config);
}

function postCommitment(info, config){
  return axios.post(`${url}/commitment`, info, config);
}

function deleteCommitment(id, config){
  return axios.delete(`${url}/commitment/${id}`, config);
}

function editCommitment(id, info, config){
  return axios.put(`${url}/commitment/${id}`, info, config);
}

export {
    listCommitments,
    postCommitment,
    deleteCommitment,
    editCommitment
}