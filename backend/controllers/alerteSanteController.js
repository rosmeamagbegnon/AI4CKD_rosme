// controllers/alerteSanteController.js
const AlerteSante = require('../models/alerteSante.model');

// ✅ Créer une alerte (manuelle ou depuis moteur)
exports.createAlerte = async (req, res) => {
  try {
    const data = req.body;
    const alerte = await AlerteSante.create(data);
    res.status(201).json(alerte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister toutes les alertes d’un patient
exports.getAlertesByPatient = async (req, res) => {
  try {
    const alertes = await AlerteSante.findAll({
      where: { patient_id: req.params.patientId },
      order: [['date_detection', 'DESC']]
    });
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister les alertes actives
exports.getAlertesActives = async (req, res) => {
  try {
    const alertes = await AlerteSante.findAll({
      where: {
        patient_id: req.params.patientId,
        statut: 'active'
      },
      order: [['date_detection', 'DESC']]
    });
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Marquer une alerte comme résolue
exports.resoudreAlerte = async (req, res) => {
  try {
    const alerte = await AlerteSante.findByPk(req.params.alerteId);
    if (!alerte) return res.status(404).json({ error: 'Alerte non trouvée' });

    await alerte.update({ statut: 'resolue' });
    res.json({ message: 'Alerte résolue avec succès', alerte });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer une alerte (optionnel)
exports.deleteAlerte = async (req, res) => {
  try {
    const alerte = await AlerteSante.findByPk(req.params.alerteId);
    if (!alerte) return res.status(404).json({ error: 'Alerte non trouvée' });

    await alerte.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
