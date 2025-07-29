const InformationsCliniques = require('../models/InformationsCliniques');

// ✅ Ajouter des infos cliniques
exports.createInfo = async (req, res) => {
  try {
    const info = await InformationsCliniques.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Lister toutes les infos cliniques
exports.getAllInfos = async (req, res) => {
  try {
    const infos = await InformationsCliniques.findAll();
    res.json(infos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Récupérer une fiche clinique par ID
exports.getInfoById = async (req, res) => {
  try {
    const info = await InformationsCliniques.findByPk(req.params.id);
    if (!info) return res.status(404).json({ error: 'Fiche non trouvée' });
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Modifier une fiche clinique
exports.updateInfo = async (req, res) => {
  try {
    const [updated] = await InformationsCliniques.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Fiche non trouvée' });
    const info = await InformationsCliniques.findByPk(req.params.id);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer une fiche clinique
exports.deleteInfo = async (req, res) => {
  try {
    const deleted = await InformationsCliniques.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Fiche non trouvée' });
    res.json({ message: 'Fiche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
