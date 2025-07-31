import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Assure-toi que ton backend tourne ici
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

/** ========================
 *  FONCTIONS PATIENTS
 *  ======================== */

// Liste tous les patients
export const fetchPatients = () => api.get('/');

// Récupère un patient par ID
export const getPatientById = (id) => api.get(`/${id}`);

// Crée un nouveau patient
export const createPatient = (data) => api.post('/', data);

// Met à jour un patient
export const updatePatient = (id, data) => api.put(`/${id}`, data);

// Archive un patient
export const archivePatient = (id) => api.patch(`/${id}/archive`);


/** ========================
 *  FONCTIONS DIAGNOSTICS
 *  ======================== */

// Liste les diagnostics d’un patient
export const fetchDiagnosticsByPatient = (patientId) =>
  api.get(`/patients/${patientId}/diagnostics`);

// Crée un diagnostic pour un patient
export const createDiagnostic = (patientId, data) =>
  api.post(`/patients/${patientId}/diagnostics`, data);

// Récupère un diagnostic par ID
export const getDiagnosticById = (id) => api.get(`/${id}`);

// Met à jour un diagnostic
export const updateDiagnostic = (id, data) => api.put(`/${id}`, data);

// Supprime un diagnostic
export const deleteDiagnostic = (id) => api.delete(`/${id}`);
