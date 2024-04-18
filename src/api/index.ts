import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  timeout: 5000,
});

instance.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    return Promise.reject(error);
  },
);

export { instance };
