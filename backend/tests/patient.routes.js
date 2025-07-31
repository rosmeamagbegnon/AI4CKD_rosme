// tests/patient.test.js

const request = require('supertest');
const express = require('express');
const patientRoutes = require('../routes/patient.routes');
const db = require('../models');

const app = express();
app.use(express.json());
app.use('/api', patientRoutes);

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('Patients API', () => {
  it('doit créer un patient', async () => {
    const res = await request(app)
      .post('/api')
      .send({
        nom: 'Dupont',
        prenoms: 'Jean',
        date_naissance: '1980-01-01',
        sexe: 'Masculin',
        telephone: '0123456789',
        poids: 75,
        taille: 180,
        groupe_sanguin: 'A+',
        allergies: 'aucune',
        antecedents: 'aucun',
        traitements: ''
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('doit récupérer la liste des patients', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // autres tests update, get by id, archive, etc...
});
