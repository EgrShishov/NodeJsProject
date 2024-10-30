import {apiRequest} from "./apiservice.js";

export const getServices = () => apiRequest('get', '/services/all', {}, true);
export const createService = (data) => apiRequest('post', '/services', data, true);
export const activateService = (serviceId) => apiRequest('post', `/services/make-active/${serviceId}`, {}, true);
export const inactivateService = (serviceId) => apiRequest('post', `/services/make-inactive/${serviceId}`, {}, true);
export const deleteService = (serviceId) => apiRequest('delete', `/services/${serviceId}`, {}, true);