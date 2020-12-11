import axios from 'axios';

const instance = axios.create(
    {
        baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : '/',
        // timeout: 1000,
      }
);
instance.defaults.headers.common.Authorization = `Token ${localStorage.getItem('accessToken')}`;
export default instance;
