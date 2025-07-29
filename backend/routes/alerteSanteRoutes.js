// routes/alerteSanteRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alerteSanteController');

router.post('/', ctrl.createAlerte);
router.get('/patient/:patientId', ctrl.getAlertesByPatient);
router.get('/patient/:patientId/actives', ctrl.getAlertesActives);
router.patch('/:alerteId/resoudre', ctrl.resoudreAlerte);
router.delete('/:alerteId', ctrl.deleteAlerte); // optionnel

module.exports = router;
