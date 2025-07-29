const Patient = require('../models/Patient');

// ✅ Ajouter un patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Lister tous les patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Détails d’un patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient introuvable' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Modifier un patient
exports.updatePatient = async (req, res) => {
  try {
    const [updated] = await Patient.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Patient non trouvé' });
    const patient = await Patient.findByPk(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer un patient
exports.deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json({ message: 'Patient supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
