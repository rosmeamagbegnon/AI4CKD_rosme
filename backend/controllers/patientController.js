// controllers/patientController.js
const Patient = require('../models/patientModel');
const Consultation = require('../models/consultationModel'); // à adapter selon ton chemin

// ✅ Créer un patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer tous les patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer un patient par ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mettre à jour un patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    await patient.update(req.body);
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Supprimer un patient (optionnel)
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    await patient.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPatientWithMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [
        {
          model: Consultation,
          as: 'consultations',
          order: [['date_consultation', 'DESC']]
        }
      ]
    });

    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    // Exemple d’alerte simple : patient ayant un diagnostic critique
    const alertes = patient.consultations?.filter(c => 
      c.diagnostic && c.diagnostic.toLowerCase().includes('critique')
    );

    res.status(200).json({
      patient,
      alertes: alertes ?? []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadPatientFile = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });

    // Enregistrement chemin du fichier (si tu veux l'enregistrer en DB)
    patient.medicalFile = req.file.path;
    await patient.save();

    res.status(200).json({ message: 'Fichier téléversé avec succès', file: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { Op } = require('sequelize');

exports.searchPatients = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Aucun terme de recherche fourni' });

  try {
    const results = await Patient.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.iLike]: `%${query}%` } },
          { prenom: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ]
      }
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
