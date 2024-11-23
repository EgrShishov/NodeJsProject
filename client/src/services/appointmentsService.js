import {apiRequest} from "./apiservice.js";

export const getAppointments = () => apiRequest('get', '/appointments/all', {}, true);
export const getAppointmentById = (appointmentId) => apiRequest('get', `/appointments/${appointmentId}`, {}, true);
export const createAppointment = (data) => apiRequest('post', '/appointments', data, true);
export const getDoctorsSchedule = (doctorId) => apiRequest('get', `/appointments/schedule/${doctorId}`, {}, true);
export const getPatientAppointments = (patientId) => apiRequest('get', `/appointments/patients/${patientId}`, {}, true);
export const approveAppointment = (appoitmentId) => apiRequest('post', `/appointments/approve/${appoitmentId}`, {}, true);
export const cancelAppointment = (appoitmentId) => apiRequest('post', `/appointments/cancel/${appoitmentId}`, {}, true);