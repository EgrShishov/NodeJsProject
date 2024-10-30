import {apiRequest} from "./apiservice.js";

export const getAllSpecializations = () => apiRequest('get', '/specializations/all', {});
export const getSpecializationById = (specializationId) => apiRequest('get', `/specializations/${specializationId}`, {});
export const createSpecialization = (data) => apiRequest('post', '/specializations', data, true);
export const editSpecialization = (specializationId, data) => apiRequest('put', `/specializations/${specializationId}`, data, true);
export const deleteSpecialization = (specializationId) => apiRequest('delete', `/specializations/${specializationId}`, {}, true);
