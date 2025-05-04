import { apiBaseUrl } from './api-endpoints';
import axios from 'axios';
const apiInstance = axios.create({
    baseURL: apiBaseUrl.api,
    headers: {
        'Cache-Control': 'no-cache, no-transform'
    }
});


apiInstance.interceptors.request.use((config) => {
    console.log('Axios Request Method:', config.method?.toUpperCase());
    console.log('Axios Request URL:', config.url);
    console.log('Axios Request Headers:', config.headers);
    return config;
});
export { apiInstance as default };