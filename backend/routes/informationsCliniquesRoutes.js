const express = require('express');
const router = express.Router();
const informationsCliniquesController = require('../controllers/informationsCliniquesController');

// Créer une nouvelle entrée d'informations cliniques pour un patient
router.post('/:patientId', informationsCliniquesController.ajouterDonneesCliniques);

// Récupérer tout l'historique clinique d'un patient
router.get('/:patientId', informationsCliniquesController.getHistoriqueClinique);

// Récupérer le dernier relevé clinique du patient
router.get('/:patientId/latest', informationsCliniquesController.getDernierReleve);

// Récupérer l'évolution clinique du patient (ex: données pour graphiques)
router.get('/:patientId/evolution', informationsCliniquesController.getClinicalEvolution);

// Récupérer les alertes critiques (valeurs anormales) du patient
router.get('/:patientId/alertes-critiques', informationsCliniquesController.filterCriticalValues);

module.exports = router;
