const express = require('express');
const router = express.Router();
const { exportDossierMedicalPDF } = require('../controllers/pdfController');

router.get('/dossier/:patientId', exportDossierMedicalPDF);

module.exports = router;
