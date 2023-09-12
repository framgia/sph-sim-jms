import axios from 'axios'

const axios_instance = axios.create({
    baseURL: process.env.API_BASE_URL,
});

export default axios_instance
