// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log,
  }
);

// Connexion test
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Connexion à MySQL réussie');
  } catch (error) {
    console.error('🔴 Erreur de connexion à MySQL :', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
