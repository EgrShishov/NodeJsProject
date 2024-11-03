import { apiRequest } from './apiService';

export const getAllOffices = () =>  apiRequest('GET', '/offices/all');
export const getOfficeById = (officeId) => apiRequest('GET', `/offices/${officeId}`);
export const createOffice = (officeData) => apiRequest('POST', '/offices', officeData, true);
export const editOffice = (officeId, officeData) => apiRequest('PUT', `/offices/${officeId}`, officeData, true);
export const deleteOffice = (officeId) => apiRequest('DELETE', `/offices/${officeId}`, {}, true);