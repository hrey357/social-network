import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const likeApi = axios.create({
  baseURL: 'http://localhost:4000/api/like'
});

likeApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if ( token ) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }
    return config;
  }
)

export {
  likeApi
}