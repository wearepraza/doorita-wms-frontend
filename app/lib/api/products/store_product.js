import axios from 'axios';
import { BASE_URL } from '../config.js';
import Cookies from 'js-cookie';

export async function store_product(name, category, id = null) {
  let dataParams = { name, category };

  if (id !== null) {
    dataParams.id = id;
  }

  try {
    return await axios.post(`${BASE_URL}product/store`, dataParams,
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
