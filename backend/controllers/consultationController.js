const Consultation = require('../models/consultationModel');

// ✅ Créer une consultation
exports.createConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Récupérer toutes les consultations d’un patient
exports.getConsultationsByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const consultations = await Consultation.findAll({
      where: { patient_id: patientId },
      order: [['date_consultation', 'DESC']]
    });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Voir une consultation par ID
exports.getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation non trouvée' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mettre à jour une consultation
exports.updateConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation non trouvée' });
    }

    await consultation.update(req.body);
    res.status(200).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Supprimer une consultation (optionnel)
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation non trouvée' });
    }

    await consultation.destroy();
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
