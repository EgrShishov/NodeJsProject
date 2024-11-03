import {apiRequest} from "./apiservice.js";

export const getAllReceptionists = () => apiRequest('GET', '/doctors/all');
export const getReceptionistById = (receptionistId) => apiRequest('GET', `/receptionists/${receptionistId}`);
export const createReceptionist = (receptionistData) => apiRequest('POST', '/receptionists', receptionistData, true);
export const editReceptionist = (receptionistId, data) => apiRequest('PUT', `/receptionists/${receptionistId}`, data, true);
export const deleteReceptionist =  (receptionistId) => apiRequest('DELETE', `/receptionists/${receptionistId}`, {}, true);