const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Créer une consultation
router.post('/', consultationController.createConsultation);

// Récupérer toutes les consultations d’un patient
router.get('/patient/:patientId', consultationController.getConsultationsByPatient);

// Voir une consultation par ID
router.get('/:id', consultationController.getConsultation);

// Mettre à jour une consultation
router.put('/:id', consultationController.updateConsultation);

// Supprimer une consultation
router.delete('/:id', consultationController.deleteConsultation);

module.exports = router;
