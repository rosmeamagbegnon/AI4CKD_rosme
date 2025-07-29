const Patient = require('../models/Patient');
const InformationsCliniques = require('../models/InformationsCliniques');
const Diagnostic = require('../models/Diagnostic');

exports.getDossierComplet = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [
        { model: InformationsCliniques, as: 'InformationsClinique' },
        { model: Diagnostic }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient non trouvé' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
