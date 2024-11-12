import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function login(username, password) {
  try {
    return await axios.post(`${BASE_URL}auth/login`, {
      username,
      password
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        return error.response.data;
      }
      return error.message;
    });
  } catch (error) {
    return error;
  }
}
