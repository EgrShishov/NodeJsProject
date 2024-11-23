import {apiRequest} from "./apiservice.js";

export const register = (data) => apiRequest('post', '/auth/register', data);
export const profile = () => apiRequest('get', `/auth/profile`);
export const updateProfileInfo = (data) => apiRequest('post', '/auth/profile/update', data);
export const login = (data) => apiRequest('post', '/auth/login', data);
export const logout = () => apiRequest('post', '/auth/logout');
export const refresh = (data) => apiRequest('post', '/auth/refresh', data);
export const google = () => window.location.href = 'http://localhost:5000/auth/google';
export const facebook = () => window.location.href = 'http://localhost:5000/auth/facebook';