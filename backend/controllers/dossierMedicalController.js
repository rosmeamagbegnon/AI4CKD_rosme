const db = require('../models/DossierMedical');
const DossierMedical = db.DossierMedical;

// ➕ Créer un dossier médical
exports.create = async (req, res) => {
  try {
    const { patient_id, fichier_nom, fichier_type, chemin_fichier } = req.body;
    const dossier = await DossierMedical.create({
      patient_id,
      fichier_nom,
      fichier_type,
      chemin_fichier
    });
    res.status(201).json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Obtenir tous les dossiers
exports.getAll = async (req, res) => {
  try {
    const dossiers = await DossierMedical.findAll();
    res.json(dossiers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Obtenir un dossier par ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const dossier = await DossierMedical.findByPk(id);
    if (!dossier) return res.status(404).json({ error: 'Non trouvé' });
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Mettre à jour un dossier
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await DossierMedical.update(req.body, {
      where: { id }
    });
    if (!updated) return res.status(404).json({ error: 'Non trouvé' });
    const dossier = await DossierMedical.findByPk(id);
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Supprimer un dossier
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DossierMedical.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
