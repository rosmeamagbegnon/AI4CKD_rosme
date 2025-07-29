const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.createPatient);              // Créer un patient
router.get('/', patientController.getAllPatients);              // Liste tous les patients
router.get('/:id', patientController.getPatientById);           // Détail d’un patient
router.put('/:id', patientController.updatePatient);            // Modifier un patient
router.delete('/:id', patientController.deletePatient);         // Supprimer un patient

module.exports = router;
