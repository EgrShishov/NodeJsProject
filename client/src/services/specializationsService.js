import {apiRequest} from "./apiservice.js";

export const getAllSpecializations = () => apiRequest('get', '/specializations/all', {}, true);
export const getSpecializationById = (specializationId) => apiRequest('get', `/specializations/${specializationId}`, {}, true);
export const createSpecialization = (data) => apiRequest('post', '/specializations', data, true);
export const editSpecialization = (specializationId, data) => apiRequest('put', `/specializations/${specializationId}`, data, true);
export const deleteSpecialization = (specializationId) => apiRequest('delete', `/specializations/${specializationId}`, {}, true);
