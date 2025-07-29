// config/db.js

const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

sequelize.sync({ force: false }) // force: true => supprime et recrée les tables, false => crée si pas existantes
  .then(() => {
    console.log('✅ Tables synchronisées avec la base de données');
    // ici tu peux démarrer ton serveur Express, par ex:
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Erreur lors de la synchronisation des tables:', err);
  });

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("🟢 PostgreSQL connecté");
  } catch (error) {
    console.error("🔴 Erreur connexion PostgreSQL :", error.message);
    process.exit(1);
  }
};

// ✅ Export unique avec tous les éléments
module.exports = {
  sequelize,
  pool,
  connectDB
};
