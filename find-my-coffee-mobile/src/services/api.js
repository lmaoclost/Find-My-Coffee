import axios from 'axios';

const api = axios.create({
  baseURL: 'https://441122f74a52.ngrok.io/api/v1',
});

export default api;
