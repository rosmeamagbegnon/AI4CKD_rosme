// models/DossierMedical.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici


module.exports = (sequelize, DataTypes) => {
  const DossierMedical = sequelize.define('DossierMedical', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fichier_nom: DataTypes.STRING,
    fichier_type: DataTypes.STRING,
    chemin_fichier: DataTypes.STRING,
    date_telechargement: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'dossiers_medicaux',
    timestamps: false
  });

  return DossierMedical;
};
