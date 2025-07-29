const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  medecin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilisateurs', // ou 'Medecins' si tu as une table séparée
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  date_consultation: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motif: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diagnostic: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  traitement_prescrit: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'consultations',
  timestamps: false // désactivé car tu définis manuellement created_at / updated_at
});

module.exports = Consultation;
