const { pool } = require('../config/db');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // destructuration ici


// GET all patients

const getAllPatients = async () => {
  const result = await pool.query("SELECT * FROM patients ORDER BY id DESC");
  return result.rows;
};

// GET patient by ID
const getPatientById = async (id) => {
  const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
  return result.rows[0];
};

// CREATE patient
const createPatient = async (data) => {
  const {
    nom, prenom, date_naissance, sexe, domicile, numero,
    groupe_sanguin, poids, tension_arterielle, allergies, alertes
  } = data;

  const result = await pool.query(
    `INSERT INTO patients (
      nom, prenom, date_naissance, sexe, domicile, numero,
      groupe_sanguin, poids, tension_arterielle, allergies, alertes
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [nom, prenom, date_naissance, sexe, domicile, numero,
     groupe_sanguin, poids, tension_arterielle, allergies, alertes]
  );

  return result.rows[0];
};

// UPDATE patient
const updatePatient = async (id, data) => {
  const {
    nom, prenom, date_naissance, sexe, domicile, numero,
    groupe_sanguin, poids, tension_arterielle, allergies, alertes
  } = data;

  const result = await pool.query(
    `UPDATE patients SET
      nom=$1, prenom=$2, date_naissance=$3, sexe=$4, domicile=$5, numero=$6,
      groupe_sanguin=$7, poids=$8, tension_arterielle=$9, allergies=$10, alertes=$11
     WHERE id = $12 RETURNING *`,
    [nom, prenom, date_naissance, sexe, domicile, numero,
     groupe_sanguin, poids, tension_arterielle, allergies, alertes, id]
  );

  return result.rows[0];
};

// DELETE patient
const deletePatient = async (id) => {
  await pool.query("DELETE FROM patients WHERE id = $1", [id]);
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
