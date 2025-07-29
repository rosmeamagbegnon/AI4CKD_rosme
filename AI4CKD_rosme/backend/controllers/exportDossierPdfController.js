const PDFDocument = require('pdfkit');
const moment = require('moment');
const Patient = require('../models/Patient');
const InformationsCliniques = require('../models/InformationsCliniques');
const Diagnostic = require('../models/Diagnostic');

exports.exportDossierPdf = async (req, res) => {
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

    const doc = new PDFDocument();
    const fileName = `dossier_patient_${patient.id}.pdf`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Début du PDF
    doc.fontSize(20).text(`🩺 Dossier Médical du Patient`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);

    // Section Patient
    doc.text(`Nom : ${patient.nom}`);
    doc.text(`Prénom : ${patient.prenom}`);
    doc.text(`Date de naissance : ${moment(patient.dateNaissance).format('DD/MM/YYYY')}`);
    doc.text(`Sexe : ${patient.sexe}`);
    doc.text(`Domicile : ${patient.domicile}`);
    doc.text(`Numéro : ${patient.numero}`);
    doc.moveDown();

    // Infos cliniques
    if (patient.InformationsClinique) {
      doc.fontSize(14).text(`Informations Cliniques`, { underline: true });
      const info = patient.InformationsClinique;
      doc.fontSize(12);
      doc.text(`Groupe sanguin : ${info.groupeSanguin}`);
      doc.text(`Poids : ${info.poids} kg`);
      doc.text(`Tension Artérielle : ${info.tensionArterielle}`);
      doc.text(`Allergies : ${info.allergies}`);
      doc.text(`Alertes : ${info.alertes}`);
      doc.moveDown();
    }

    // Diagnostics
    // Diagnostics
if (patient.diagnostics && patient.diagnostics.length > 0) {
  doc.addPage(); // Optionnel : créer une nouvelle page pour les diagnostics
  doc.fontSize(16).fillColor('black').text('🧪 Diagnostics', { underline: true });
  doc.moveDown();

  patient.diagnostics.forEach((diag, index) => {
    doc.fontSize(13).fillColor('blue').text(`📌 Diagnostic #${index + 1}`, { continued: false });
    doc.fontSize(12).fillColor('black');
    
    if (diag.resultats_examens) {
      doc.text(`Résultats d'examens : ${diag.resultats_examens}`);
    }
    if (diag.observations) {
      doc.text(`Observations : ${diag.observations}`);
    }
    if (diag.diagnostic_final) {
      doc.text(`Diagnostic final : ${diag.diagnostic_final}`);
    }

    doc.moveDown();
  });
}

    

    doc.end();
    doc.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
