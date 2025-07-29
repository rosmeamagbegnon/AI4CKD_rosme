const express = require('express');
const router = express.Router();
const dossierController = require('../controllers/dossierMedicalController');

router.get('/:id', dossierController.getDossierComplet);

module.exports = router;
