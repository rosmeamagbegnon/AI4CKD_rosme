const MaladieChronique = require('../models/maladieChronique.model');

// ✅ Ajouter une maladie chronique
exports.addChronicCondition = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const data = { ...req.body, patient_id: patientId };
    const maladie = await MaladieChronique.create(data);
    res.status(201).json({ message: 'Maladie chronique ajoutée', maladie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Récupérer les maladies chroniques d’un patient
exports.getChronicConditions = async (req, res) => {
  try {
    const maladies = await MaladieChronique.findAll({
      where: { patient_id: req.params.patientId }
    });
    res.json(maladies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mettre à jour une maladie chronique
exports.updateChronicCondition = async (req, res) => {
  try {
    const maladie = await MaladieChronique.findByPk(req.params.id);
    if (!maladie) {
      return res.status(404).json({ error: 'Maladie non trouvée' });
    }

    await maladie.update(req.body);
    res.json({ message: 'Maladie mise à jour', maladie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Supprimer une maladie chronique
exports.deleteChronicCondition = async (req, res) => {
  try {
    const maladie = await MaladieChronique.findByPk(req.params.id);
    if (!maladie) {
      return res.status(404).json({ error: 'Maladie non trouvée' });
    }

    await maladie.destroy();
    res.json({ message: 'Maladie supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
