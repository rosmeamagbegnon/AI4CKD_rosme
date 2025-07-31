const express = require('express');
const router = express.Router();
const diagCtrl = require('../controllers/diagnostic.controller');

router.get('/patients/:patientId/diagnostics', diagCtrl.getDiagnosticsByPatient);
router.post('/patients/:patientId/diagnostics', diagCtrl.createDiagnostic);
router.get('/:id', diagCtrl.getDiagnosticById);
router.put('/:id', diagCtrl.updateDiagnostic);
router.delete('/:id', diagCtrl.deleteDiagnostic);

module.exports = router;
