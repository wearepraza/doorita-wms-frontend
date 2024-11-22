import axios from 'axios';
import { BASE_URL } from '../config.js';
import Cookies from 'js-cookie';

export async function delete_product(id, status) {
  try {
    return await axios.post(`${BASE_URL}product/status`, {
      id, status
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