const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportDossierPdfController');

router.get('/patients/:id/export-pdf', exportController.exportDossierPdf);

module.exports = router;
