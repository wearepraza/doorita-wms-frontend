import axios from 'axios';
import { BASE_URL } from '../config.js';
import Cookies from 'js-cookie';

export async function update_user(name, id) {
  try {
    return await axios.post(`${BASE_URL}user/update`, {
      name,
      id
    },
    {
      headers: {
        Authorization: Cookies.get("authToken"),
      },
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