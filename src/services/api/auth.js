import axios from 'axios';

import url from './api';

function signIn(userSignIn) {
  return axios.post(`${url}/signin`, userSignIn);
}

function signUp(userSignUp) {
  return axios.post(`${url}/signup`, userSignUp);
}

export {
  signIn,
  signUp
}