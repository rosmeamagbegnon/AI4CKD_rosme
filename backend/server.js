require('dotenv').config(); // charger variables environnement si besoin
const app = require('./app');
const { sequelize, connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connexion Pool SQL natif
    await connectDB();

    // Synchronisation Sequelize (modèles -> tables)
    await sequelize.sync({ force: false });  // force:false = ne détruit pas les tables

    // Démarrer serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur au démarrage :", error);
    process.exit(1);
  }
}

startServer();
