const db = require('../models');
const Patient = db.Patient;
const Diagnostic = db.Diagnostic;  // Assure-toi que le modèle Diagnostic est bien exporté dans ../models

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ order: [['createdAt', 'DESC']] });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [
        {
          model: Diagnostic,
          as: 'diagnostics',  // Vérifie que c'est bien ce nom dans ta définition de relation
        }
      ],
    });
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    await patient.update(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.archivePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    patient.est_archive = true;
    await patient.save();

    res.json({ message: 'Patient archivé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
