import {apiRequest} from "./apiservice.js";

export const getAllResults = () => apiRequest('get', '/results/all', {}, true);
export const getResultById = (resultId) => apiRequest('get', `/results/${resultId}`, {}, true);
export const getResultsByPatient = (patientId) => apiRequest('get', `/results/by-patient/${patientId}`, {}, true);
export const createResult = (data) => apiRequest('post', '/results', data, true);
export const editResult = (resultId, data) => apiRequest('put', `/results/${resultId}`, data, true);
export const deleteResult = (resultId) => apiRequest('delete', `/results/${resultId}`, {}, true);
