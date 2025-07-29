const InformationsCliniques = require('../models/informationsCliniques.model');
const AlerteSante = require('../models/alerteSante.model');
const { analyserDonnees } = require('../services/analyseService');

// ✅ Ajouter des données cliniques + générer alertes
exports.ajouterDonneesCliniques = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const data = { ...req.body, patient_id: patientId };

    // 1. Enregistrement
    const entry = await InformationsCliniques.create(data);

    // 2. Analyse
    const alertes = analyserDonnees(data);

    // 3. Enregistrement des alertes
    for (const alerte of alertes) {
      await AlerteSante.create({
        patient_id: patientId,
        ...alerte,
      });
    }

    res.status(201).json({ message: 'Données enregistrées', alertes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Voir toutes les données cliniques d’un patient
exports.getHistoriqueClinique = async (req, res) => {
  try {
    const data = await InformationsCliniques.findAll({
      where: { patient_id: req.params.patientId },
      order: [['date_enregistrement', 'DESC']]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Voir le dernier relevé
exports.getDernierReleve = async (req, res) => {
  try {
    const data = await InformationsCliniques.findOne({
      where: { patient_id: req.params.patientId },
      order: [['date_enregistrement', 'DESC']]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterCriticalValues = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const data = await InformationsCliniques.findAll({
      where: { patient_id: patientId },
      order: [['date_enregistrement', 'DESC']]
    });

    // Règles simples d’alerte (à adapter selon ton projet)
    const critical = data.filter(entry => {
      return (
        entry.temperature > 39 ||
        entry.tension_systolique > 180 ||
        entry.tension_diastolique > 110 ||
        entry.frequence_cardiaque > 120
      );
    });

    res.json(critical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ✅ Obtenir l'évolution clinique d'un patient
exports.getClinicalEvolution = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const data = await InformationsCliniques.findAll({
      where: { patient_id: patientId },
      order: [['date_enregistrement', 'ASC']],
      attributes: ['date_enregistrement', 'temperature', 'tension_systolique', 'tension_diastolique', 'frequence_cardiaque'] // à adapter
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
