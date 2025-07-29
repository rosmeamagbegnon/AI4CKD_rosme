const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController');

// Ajouter une allergie
router.post('/:patientId', async (req, res) => {
  try {
    const allergy = await allergyController.addAllergy(req.params.patientId, req.body);
    res.status(201).json(allergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer toutes les allergies d’un patient
router.get('/:patientId', async (req, res) => {
  try {
    const allergies = await allergyController.getAllergies(req.params.patientId);
    res.status(200).json(allergies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une allergie
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedAllergy = await allergyController.updateAllergy(req.params.id, req.body);
    res.status(200).json(updatedAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une allergie
router.delete('/:id', async (req, res) => {
  try {
    const result = await allergyController.deleteAllergy(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
