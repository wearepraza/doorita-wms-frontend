import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function create_user(name, username, password, role) {
  try {
    return await axios.post(`${BASE_URL}user/create`, {
      name,
      username,
      password,
      role
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