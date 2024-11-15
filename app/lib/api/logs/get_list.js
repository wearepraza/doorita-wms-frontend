import axios from 'axios';
import { BASE_URL } from '../config.js';
import Cookies from "js-cookie";

export async function get_logs_list() {
  try {
    return await axios.post(`${BASE_URL}log/list`, {
      
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