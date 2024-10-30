import {apiRequest} from "./apiservice.js";

export const getAllPayments = () => apiRequest('get', '/payments/all', {}, true);
export const getPaymentById = (paymentId) => apiRequest('get', `/payments/${paymentId}`, {}, true);
export const getPatientPayments = (patientId) => apiRequest('get', `/payments/${patientId}`, {}, true);
export const getPaymentHistory = (patientId) => apiRequest('get', `/payments/history/${patientId}`, {}, true);
export const createPayment = (data) => apiRequest('post', '/payments', data, true);
