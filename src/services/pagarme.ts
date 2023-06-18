import axios from 'axios';

const api = axios.create({
  baseURL: "https:api.pagar.me/1",
})

const api_key = require("../data/keys.json").api_key;

module.exports = async (endpoint: any, data: any) => {
  try {
    const response = await api.post(endpoint, {
      api_key,
      ...data,
    });

    return { error: false,  data: response.data }
  } catch (error) {
    return {
      error: true,
      message: JSON.stringify(error),
    }
  }
}