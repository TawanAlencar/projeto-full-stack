import axios from "axios"
import { AxiosInstance } from "axios";

const api:AxiosInstance = axios.create({
    baseURL: 'https://fullstack-kgtc.onrender.com/',
    timeout: 2000
});

export default api;