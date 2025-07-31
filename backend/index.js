const express = require('express');
const cors = require('cors');
const db = require('./models');
const patientRoutes = require('./routes/patient.routes');
const diagnosticRoutes = require('./routes/diagnostic.routes');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173', // bon port de Vite
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use(express.json());

// Routes
app.use('/api', patientRoutes);
app.use('/api', diagnosticRoutes);

// app.post('/addpatient', (req, res) => {
//   const sql = `INSERT INTO patients (nom, prenoms, date_naissance, sexe, telephone, groupe_sanguin, allergies, antecedents_medicaux, traitements_en_cours) VALUES (?)`;
//   const values = [
//     req.body.nom,
//     req.body.prenoms,
//     req.body.date_naissance,
//     req.body.sexe,
//     req.body.telephone,
//     req.body.groupe_sanguin,
//     req.body.allergies,
//     req.body.antecedents_medicaux,
//     req.body.traitements_en_cours
//   ];
//   db.query(sql, [values], (err, result) => {
//     if (err) {
//       console.error('Erreur lors de l\'insertion du patient :', err);
//       return res.status(500).json({ error: 'Erreur lors de l\'insertion du patient' });
//     }
//     res.status(201).json({ message: 'Patient ajouté avec succès', patientId: result.insertId });
//   });
// });
// Connexion DB + sync
db.sequelize.sync().then(() => {
  console.log('Base de données synchronisée.');
  app.listen(PORT, () => {
    console.log(`Serveur Express lancé sur http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Erreur de connexion à la base de données :', err);
});
