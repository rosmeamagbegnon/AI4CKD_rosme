module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    nom: DataTypes.STRING,
    prenoms: DataTypes.STRING,
    date_naissance: DataTypes.DATEONLY,
    sexe: DataTypes.STRING,
    telephone: DataTypes.STRING,
    poids: DataTypes.FLOAT,
    taille: DataTypes.FLOAT,
    groupe_sanguin: DataTypes.STRING,
    allergies: DataTypes.STRING,
    antecedents: DataTypes.STRING,
    traitements: DataTypes.STRING,
    est_archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Patient.associate = (models) => {
    Patient.hasMany(models.Diagnostic, {
      foreignKey: 'patient_id',
      as: 'diagnostics'
    });
  };

  return Patient;
};
