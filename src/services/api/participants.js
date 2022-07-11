import axios from 'axios';

import url from './api';

function listParticipants(id, config){
  return axios.get(`${url}/participant/${id}`, config);
}

export {
  listParticipants
}