require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./config/db');

const Patient = require('./models/Patient');
const InformationsCliniques = require('./models/InformationsCliniques');
const Diagnostic = require('./models/Diagnostic');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(); // connexion pool (optionnel)

    await sequelize.sync({ force: false }); // sync Sequelize sans supprimer les tables

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur au démarrage :", error);
    process.exit(1);
  }
}

startServer();
