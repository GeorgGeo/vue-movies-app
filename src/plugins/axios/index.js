
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    apikey: import.meta.env.VITE_API_KEY,
    plot: 'full'
  }
});

export default instance;