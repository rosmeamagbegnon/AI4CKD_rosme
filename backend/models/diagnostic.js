module.exports = (sequelize, DataTypes) => {
  const Diagnostic = sequelize.define('Diagnostic', {
    date: DataTypes.DATEONLY,
    age_au_moment: DataTypes.INTEGER,
    resultat: DataTypes.TEXT
  });

  Diagnostic.associate = (models) => {
    Diagnostic.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patient'
    });
  };

  return Diagnostic;
};
