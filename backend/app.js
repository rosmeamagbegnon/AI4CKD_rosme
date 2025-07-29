const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const infosRoutes = require('./routes/informationsCliniquesRoutes');
const dossierMedicalRoutes = require('./routes/dossierMedicalRoutes');
const diagnosticRoutes = require('./routes/diagnosticRoutes');
const exportDossierPdfRoutes = require('./routes/exportDossierPdfRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err);
  res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
});


app.use('/api/export-dossier', exportDossierPdfRoutes);
app.use('/api/diagnostics', diagnosticRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/informations-cliniques', infosRoutes);
app.use('/api/dossiers-medicaux', dossierMedicalRoutes);

module.exports = app;
