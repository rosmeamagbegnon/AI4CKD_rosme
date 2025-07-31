const request = require('supertest');
const express = require('express');
const diagnosticRoutes = require('../routes/diagnostic.routes');
const db = require('../models');

const app = express();
app.use(express.json());
app.use('/api', diagnosticRoutes);

beforeAll(async () => {
  // Synchroniser la base (optionnel, selon config)
  await db.sequelize.sync({ force: true });

  // Créer un patient test pour y associer diagnostics
  await db.Patient.create({
    nom: 'Test',
    prenoms: 'Patient',
    date_naissance: '1990-01-01',
    sexe: 'Masculin',
    telephone: '0000000000',
    poids: 70,
    taille: 180,
    groupe_sanguin: 'O+',
    allergies: '',
    antecedents: '',
    traitements: ''
  });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('Diagnostics API', () => {
  it('doit créer un diagnostic', async () => {
    const patient = await db.Patient.findOne();

    const res = await request(app)
      .post(`/api/patients/${patient.id}/diagnostics`)
      .send({
        date: '2024-07-30',
        age_au_moment: 34,
        resultat: 'Diagnostic de test'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.resultat).toBe('Diagnostic de test');
  });

  it('doit récupérer les diagnostics d’un patient', async () => {
    const patient = await db.Patient.findOne();

    const res = await request(app)
      .get(`/api/patients/${patient.id}/diagnostics`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('doit mettre à jour un diagnostic', async () => {
    const diagnostic = await db.Diagnostic.findOne();

    const res = await request(app)
      .put(`/api/${diagnostic.id}`)
      .send({ resultat: 'Diagnostic modifié' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.resultat).toBe('Diagnostic modifié');
  });

  it('doit supprimer un diagnostic', async () => {
    const diagnostic = await db.Diagnostic.findOne();

    const res = await request(app)
      .delete(`/api/${diagnostic.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Diagnostic supprimé');
  });
});
