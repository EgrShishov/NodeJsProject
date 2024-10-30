import {apiRequest} from "./apiservice.js";

export const getAppointments = () => apiRequest('get', '/appointments/all', {}, true);
export const createAppointment = (data) => apiRequest('post', '/appointments', data, true);
export const getDoctorsSchedule = (doctorId) => apiRequest('get', `/appointments/schedule/${doctorId}`, {}, true);
export const getPatientAppointments = (patientId) => apiRequest('get', `/appointments/schedule/${patientId}`, {}, true);
export const approveAppointment = (appoitmentId) => apiRequest('get', `/appointments/approve/${appoitmentId}`, {}, true);
export const cancelAppointment = (appoitmentId) => apiRequest('get', `/appointments/cancel/${appoitmentId}`, {}, true);