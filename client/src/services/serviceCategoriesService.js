import {apiRequest} from "./apiservice.js";

export const getAllServiceCategories = () => apiRequest('get', '/service-category/all', {}, true);
export const getServiceCategoryById = (categoryId) => apiRequest('get', `/service-category/${categoryId}`, {}, true);
export const createServiceCategory = (data) => apiRequest('post', '/service-category', data, true);
export const editServiceCategory = (categoryId, data) => apiRequest('put', `/service-category/${categoryId}`, data, true);
export const deleteServiceCategory = (categoryId) => apiRequest('delete', `/service-category/${categoryId}`, {}, true);
