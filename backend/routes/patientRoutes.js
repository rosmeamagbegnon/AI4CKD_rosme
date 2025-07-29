// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const upload = require('../middleware/upload');
const maladiecontroller = require('../controllers/maladiesChroniques.controller');


router.post('/', patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);



router.get('/search', patientController.searchPatients);
router.get('/:id/profile', patientController.getPatientWithMedicalHistory);
router.post('/:id/upload', upload.single('file'), patientController.uploadPatientFile);




// Maladies chroniques
router.post('/:patientId/maladies', maladiecontroller.addChronicCondition);
router.get('/:patientId/maladies', maladiecontroller.getChronicConditions);
router.put('/maladies/:id', maladiecontroller.updateChronicCondition);
router.delete('/maladies/:id', maladiecontroller.deleteChronicCondition);

module.exports = router;
