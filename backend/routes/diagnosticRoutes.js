const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnosticController');

router.post('/', diagnosticController.createDiagnostic);         // Ajouter un diagnostic
router.get('/', diagnosticController.getAllDiagnostics);         // Tous les diagnostics
router.get('/:id', diagnosticController.getDiagnosticById);      // Un diagnostic
router.put('/:id', diagnosticController.updateDiagnostic);       // Modifier
router.delete('/:id', diagnosticController.deleteDiagnostic);    // Supprimer

module.exports = router;
