const db = require('../models');
const Diagnostic = db.Diagnostic;
const Patient = db.Patient;

exports.getDiagnosticsByPatient = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.findAll({
      where: { patient_id: req.params.patientId },
      order: [['date', 'DESC']]
    });
    res.json(diagnostics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDiagnostic = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    const diagData = {
      patient_id: req.params.patientId,
      date: req.body.date,
      age_au_moment: req.body.age_au_moment,
      resultat: req.body.resultat
    };

    const diagnostic = await Diagnostic.create(diagData);
    res.status(201).json(diagnostic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDiagnosticById = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id);
    if (!diagnostic) return res.status(404).json({ error: 'Diagnostic non trouvé' });
    res.json(diagnostic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id);
    if (!diagnostic) return res.status(404).json({ error: 'Diagnostic non trouvé' });

    await diagnostic.update(req.body);
    res.json(diagnostic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id);
    if (!diagnostic) return res.status(404).json({ error: 'Diagnostic non trouvé' });

    await diagnostic.destroy();
    res.json({ message: 'Diagnostic supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
