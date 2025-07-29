const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici

const AlerteSante = sequelize.define('AlerteSante', {
  patient_id: DataTypes.INTEGER,
  type_alerte: DataTypes.STRING,
  niveau_gravite: DataTypes.STRING, // faible, modéré, critique
  message: DataTypes.TEXT,
  date_detection: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'active' // active | resolue
  }
}, {
  tableName: 'alertes_sante',
  timestamps: false,
});

module.exports = AlerteSante;
