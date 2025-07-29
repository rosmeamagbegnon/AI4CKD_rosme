const Diagnostic = require('../models/Diagnostic');

// 🧠 Fonction métier : analyse automatique
function analyserDiagnostic({ dfg, proteine, taille_rein }) {
  let stade = '';
  let description = '';

  if (dfg >= 90) {
    stade = '1';
    description = 'MRC avec fonction rénale normale';
  } else if (dfg >= 60) {
    stade = '2';
    description = 'IRC légère';
  } else if (dfg >= 45) {
    stade = '3A';
    description = 'IRC modérée';
  } else if (dfg >= 30) {
    stade = '3B';
    description = 'IRC modérée';
  } else if (dfg >= 15) {
    stade = '4';
    description = 'IRC sévère';
  } else {
    stade = '5';
    description = 'IRC terminale';
  }

  let alerte = '';
  if (proteine) alerte += 'Présence de protéinurie. ';
  if (taille_rein === 'réduite') alerte += 'Taille des reins réduite, risque élevé de MRC. ';

  let decision = (dfg < 60 || proteine || taille_rein === 'réduite')
    ? 'Patient à risque ou déjà atteint d’une MRC. Suivi et traitement recommandés.'
    : 'Fonction rénale stable, surveillance régulière conseillée.';

  return `Stade : ${stade} — ${description}. ${alerte}${decision}`;
}

// ✅ Ajouter un diagnostic
exports.createDiagnostic = async (req, res) => {
  try {
    const { dfg, proteine, taille_rein, symptomes, patient_id } = req.body;

    // ⚠️ Vérification des champs requis
    if (dfg == null || proteine == null || !taille_rein || !patient_id) {
      return res.status(400).json({ error: 'Champs requis manquants : dfg, proteine, taille_rein, patient_id' });
    }

    const resultat = analyserDiagnostic({ dfg, proteine, taille_rein });

    const diagnostic = await Diagnostic.create({
      dfg,
      proteine,
      taille_rein,
      symptomes,
      patient_id,
      resultat
    });

    res.status(201).json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Lister tous les diagnostics
exports.getAllDiagnostics = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.findAll();
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Diagnostic par ID
exports.getDiagnosticById = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id);
    if (!diagnostic) return res.status(404).json({ error: 'Diagnostic introuvable' });
    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Modifier un diagnostic
exports.updateDiagnostic = async (req, res) => {
  try {
    const { dfg, proteine, taille_rein } = req.body;

    if (dfg !== undefined && proteine !== undefined && taille_rein) {
      req.body.resultat = analyserDiagnostic({ dfg, proteine, taille_rein });
    }

    const [updated] = await Diagnostic.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) return res.status(404).json({ error: 'Diagnostic non trouvé' });

    const diagnostic = await Diagnostic.findByPk(req.params.id);
    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer un diagnostic
exports.deleteDiagnostic = async (req, res) => {
  try {
    const deleted = await Diagnostic.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Diagnostic non trouvé' });
    res.json({ message: 'Diagnostic supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
