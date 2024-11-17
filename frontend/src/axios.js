import axios from 'axios';
import { useSelector } from 'react-redux';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');


        if (token) {
            config.headers.Authorization = `${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

export default instance;