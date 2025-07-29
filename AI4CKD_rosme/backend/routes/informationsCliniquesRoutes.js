const express = require('express');
const router = express.Router();
const infosController = require('../controllers/informationsCliniquesController');

router.post('/', infosController.createInfo);                   // Ajouter infos cliniques
router.get('/', infosController.getAllInfos);                   // Liste des infos cliniques
router.get('/:id', infosController.getInfoById);                // Une info clinique
router.put('/:id', infosController.updateInfo);                 // Modifier une info clinique
router.delete('/:id', infosController.deleteInfo);              // Supprimer

module.exports = router;
