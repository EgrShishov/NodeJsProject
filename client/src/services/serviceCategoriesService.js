import {apiRequest} from "./apiservice.js";

export const getAllServiceCategories = () => apiRequest('get', '/service-categories/all', {}, true);
export const getServiceCategoryById = (categoryId) => apiRequest('get', `/service-categories/${categoryId}`, {}, true);
export const createServiceCategory = (data) => apiRequest('post', '/service-categories', data, true);
export const editServiceCategory = (categoryId, data) => apiRequest('put', `/service-categories/${categoryId}`, data, true);
export const deleteServiceCategory = (categoryId) => apiRequest('delete', `/service-categories/${categoryId}`, {}, true);
