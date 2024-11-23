import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const apiRequest = async (method, endpoint, data = {}, tokenRequired = false) => {
    try {
        const response = await axios({
            method,
            url: `${API_URL}${endpoint}`,
            data,
            withCredentials: true
        });
        if (response.status === 200) return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Server Error');
        } else if (error.request) {
            throw new Error('Network error, please try again later');
        } else {
            console.error('Error:', error.message);
            throw new Error(error.message || 'Unexpected error');
        }
    }
};