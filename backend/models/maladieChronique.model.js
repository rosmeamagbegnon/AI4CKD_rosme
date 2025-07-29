const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici


const MaladieChronique = sequelize.define('MaladieChronique', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  nom_maladie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date_diagnostic: {
    type: DataTypes.DATE,
    allowNull: true
  },
  traitement_en_cours: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'maladies_chroniques',
  timestamps: false
});

module.exports = MaladieChronique;
