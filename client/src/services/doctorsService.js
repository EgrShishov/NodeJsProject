import {apiRequest} from "./apiservice.js";

export const getAllDoctors = () => apiRequest('GET', '/doctors/all');
export const getDoctorById = (doctorId) => apiRequest('GET', `/doctors/${doctorId}`);
export const createDoctor = (doctorData) => apiRequest('POST', '/doctors', doctorData, true);
export const editDoctor = (doctorId, data) => apiRequest('PUT', `/doctors/${doctorId}`, data, true);
export const deleteDoctor =  (doctorId) => apiRequest('DELETE', `/doctors/${doctorId}`, {}, true);