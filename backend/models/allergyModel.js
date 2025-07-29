const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici

const Allergy = sequelize.define('Allergy', {
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
  substance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reaction: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  niveau_gravite: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'allergies',
  timestamps: false
});

module.exports = Allergy;
