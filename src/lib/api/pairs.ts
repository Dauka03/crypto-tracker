import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.crypto.com',
});

export const fetchPairs = async () => {
  const response = await api.get('/pairs');
  return response.data;
};
