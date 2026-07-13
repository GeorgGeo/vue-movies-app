
import axios from 'axios';
import interceptors from './interceptors';

interceptors(axios);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    apikey: import.meta.env.VITE_API_KEY,
    plot: 'full'
  }
});

interceptors(instance);

export default instance;