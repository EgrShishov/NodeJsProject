import { apiRequest } from './apiService';

export const getDocumentById = (documentId) => apiRequest('GET', `/documents/${documentId}`, {}, true);
export const createDocument = async (documentData) => apiRequest('POST', '/documents', documentData, true);
export const editDocument = async (documentId, documentData) => apiRequest('PUT', `/documents/${documentId}`, documentData, true);
export const deleteDocument = async (documentId) => apiRequest('DELETE', `/documents/${documentId}`, {}, true);