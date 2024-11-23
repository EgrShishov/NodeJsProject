import {apiRequest} from "./apiservice.js";

export const getAllPatients = () => apiRequest('get', '/patients/all', {}, true);
export const getPatientById = (patientId) => apiRequest('get', `/patients/${patientId}`, {}, true);
export const getDoctorsPatients = (doctorId) => apiRequest('get', `/patients/by-doctor/${doctorId}`, {}, true);
export const createPatient = (data) => apiRequest('post', '/patients', data, true);
export const editPatient = (patientId, data) => apiRequest('put', `/patients/${patientId}`, data, true);
export const deletePatient = (patientId) => apiRequest('delete', `/patients/${patientId}`, {}, true);