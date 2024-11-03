import {apiRequest} from "./apiservice.js";

export const getAllProcedures = () => apiRequest('get', '/procedures/all', {}, true);
export const getProcedureById = (procedureId) => apiRequest('get', `/procedures/${procedureId}`, {}, true);
export const createProcedure = (data) => apiRequest('post', '/procedures', data, true);
export const editProcedure = (procedureId, data) => apiRequest('put', `/procedures/${procedureId}`, data, true);
export const deleteProcedure = (procedureId) => apiRequest('delete', `/procedures/${procedureId}`, {}, true);
