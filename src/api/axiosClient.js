import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    params: {
        api_key: process.env.REACT_APP_API_KEY,
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
