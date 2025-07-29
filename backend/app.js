const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const infosRoutes = require('./routes/informationsCliniquesRoutes');
const alertesRoutes = require('./routes/alerteSanteRoutes');
const dossierMedicalRoutes = require('./routes/dossierMedicalRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const allergyRoutes = require('./routes/allergyRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/informations-cliniques', infosRoutes);
app.use('/api/alertes', alertesRoutes);
app.use('/api/dossiers-medicaux', dossierMedicalRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/allergies', allergyRoutes);
app.use('/api/pdf', pdfRoutes);

module.exports = app;
