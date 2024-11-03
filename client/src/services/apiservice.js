import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = 'http://localhost:5000';

const getToken = () => Cookies.get('access');

export const apiRequest = async (method, endpoint, data = {}, tokenRequired = false) => {
    //const headers = tokenRequired ? { Authorization: `Bearer ${getToken()}` } : {};

    try {
        const response = await axios({
            method,
            url: `${API_URL}${endpoint}`,
            data,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        throw error.response ? error.response.data : error;
    }
};