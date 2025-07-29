module.exports = (sequelize, DataTypes) => {
  const Diagnostic = sequelize.define('Diagnostic', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dfg: DataTypes.FLOAT,
    proteine: DataTypes.BOOLEAN,
    taille_rein: DataTypes.ENUM('normale', 'réduite'),
    symptomes: DataTypes.TEXT,
    resultat: DataTypes.TEXT,
  }, {
    tableName: 'diagnostics'
  });

  Diagnostic.associate = function(models) {
    Diagnostic.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patient'
    });
  };

  return Diagnostic;
};
