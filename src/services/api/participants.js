import axios from 'axios';

import url from './api';

function listParticipants(id, config){
  return axios.get(`${url}/participant/${id}`, config);
}

function postParticipant(participant, config){
  return axios.post(`${url}/participant`, participant, config);
}

export {
  listParticipants,
  postParticipant
}