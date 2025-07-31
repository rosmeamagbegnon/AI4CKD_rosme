const express = require('express');
const router = express.Router();
const patientCtrl = require('../controllers/patientController');

router.get('/', patientCtrl.getAllPatients);
router.get('/:id', patientCtrl.getPatientById);
router.post('/', patientCtrl.createPatient);
router.put('/:id', patientCtrl.updatePatient);
router.patch('/:id/archive', patientCtrl.archivePatient);

module.exports = router;
