const PDFDocument = require('pdfkit');
const Patient = require('../models/patientModel');
const DossierMedical = require('../models/DossierMedical');
const Consultation = require('../models/consultationModel');

exports.exportDossierMedicalPDF = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await Patient.findByPk(patientId, {
      include: [DossierMedical, Consultation], // inclure les relations nécessaires
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient introuvable' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="dossier_medical.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    // --- Contenu du PDF ---
    doc.fontSize(18).text('Dossier Médical', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Nom: ${patient.nom}`);
    doc.text(`Prénom: ${patient.prenom}`);
    doc.text(`Date de naissance: ${patient.date_naissance}`);
    doc.moveDown();

    if (patient.DossierMedical) {
      doc.fontSize(16).text('Informations médicales :');
      doc.fontSize(12).text(`Groupe sanguin: ${patient.DossierMedical.groupe_sanguin}`);
      doc.text(`Maladies chroniques: ${patient.DossierMedical.maladies_chroniques}`);
      doc.moveDown();
    }

    if (patient.Consultations && patient.Consultations.length > 0) {
      doc.fontSize(16).text('Historique des consultations :');
      patient.Consultations.forEach((consult, index) => {
        doc.fontSize(12).text(`- ${consult.date_consultation}: ${consult.diagnostic}`);
      });
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération du PDF' });
  }
};
