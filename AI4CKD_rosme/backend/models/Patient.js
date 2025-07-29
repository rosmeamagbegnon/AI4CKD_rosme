const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Patient extends Model {}

  Patient.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    date_naissance: { type: DataTypes.DATEONLY, allowNull: false },
    sexe: { type: DataTypes.STRING, allowNull: false },
    domicile: { type: DataTypes.STRING },
    numero: { type: DataTypes.STRING },
    groupe_sanguin: { type: DataTypes.STRING },
    poids: { type: DataTypes.INTEGER },
    tension_arterielle: { type: DataTypes.STRING },
    allergies: { type: DataTypes.STRING },
    alertes: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    timestamps: false
  });

  return Patient;
};
