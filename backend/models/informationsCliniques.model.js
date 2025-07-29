const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici


const InformationsCliniques = sequelize.define('InformationsCliniques', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poids: DataTypes.FLOAT,
  taille: DataTypes.FLOAT,
  tension_arterielle: DataTypes.STRING, // ex: "140/90"
  frequence_cardiaque: DataTypes.INTEGER,
  glycemie: DataTypes.FLOAT,
  temperature: DataTypes.FLOAT,
  symptomes: DataTypes.TEXT,
  diagnostic_provisoire: DataTypes.TEXT,
  medecin_id: DataTypes.INTEGER,
  date_enregistrement: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'informations_cliniques',
  timestamps: false,
});

module.exports = InformationsCliniques;
