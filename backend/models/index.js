const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('clinique', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Patient = require('./patientModel')(sequelize, DataTypes);
db.Diagnostic = require('./diagnostic')(sequelize, DataTypes);

// Appel des relations
if (db.Patient.associate) db.Patient.associate(db);
if (db.Diagnostic.associate) db.Diagnostic.associate(db);

module.exports = db;
