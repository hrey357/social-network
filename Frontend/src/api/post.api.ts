import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const postApi = axios.create({
  baseURL: 'http://localhost:4010/api/post'
});

postApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if ( token ) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }
    return config;
  }
)

export {
  postApi
}