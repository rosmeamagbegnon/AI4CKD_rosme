// models/patient.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici

const Patient = sequelize.define('Patient', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  sexe: DataTypes.STRING,
  date_naissance: DataTypes.DATE,
  telephone: DataTypes.STRING,
  email: DataTypes.STRING,
  adresse: DataTypes.TEXT,
  groupe_sanguin: DataTypes.STRING,
  nationalite: DataTypes.STRING,
  photo: DataTypes.TEXT
}, {
  tableName: 'patients',
  timestamps: false,
});

module.exports = Patient;
