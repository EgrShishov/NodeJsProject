import {apiRequest} from "./apiservice.js";

export const getAllPrescriptions = () => apiRequest('get', '/prescriptions/all', {}, true);
export const getPrescriptionById = (prescriptionId) => apiRequest('get', `/prescriptions/${prescriptionId}`, {}, true);
export const getPatientPrescriptions = (patientId) => apiRequest('get', `/prescriptions/${patientId}`, {}, true);
export const createPrescription = (data) => apiRequest('post', '/prescriptions', data, true);
export const editPrescription = (prescriptionId, data) => apiRequest('put', `/prescriptions/${prescriptionId}`, data, true);
export const deletePrescription = (prescriptionId) => apiRequest('delete', `/prescriptions/${prescriptionId}`, {}, true);
