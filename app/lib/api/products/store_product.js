import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function store_product(name, id = null) {
  let dataParams = { name };

  if (id !== null) {
    dataParams.id = id;
  }

  try {
    return await axios.post(`${BASE_URL}product/store`, dataParams)
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
