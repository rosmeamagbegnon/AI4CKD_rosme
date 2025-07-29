'use strict';

module.exports = (sequelize, DataTypes) => {
  const InformationsCliniques = sequelize.define('InformationsCliniques', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupeSanguin: {
      type: DataTypes.STRING
    },
    poids: {
      type: DataTypes.FLOAT
    },
    tensionArterielle: {
      type: DataTypes.STRING
    },
    alertes: {
      type: DataTypes.TEXT
    },
    allergies: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'informations_cliniques',
    timestamps: false
  });

  InformationsCliniques.associate = (models) => {
    InformationsCliniques.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patient'
    });
  };

  return InformationsCliniques;
};
