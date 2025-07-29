const request = require('supertest');
const app = require('../app'); // L'application Express
const { sequelize, Patient } = require('../models'); // Import du modèle Sequelize
require('dotenv').config({ path: '.env.test' });

// Utilisation d'une base propre avant chaque test
beforeAll(async () => {
  await sequelize.sync({ force: true }); // ⚠️ remet la base à zéro (utile pour tests)
});

afterAll(async () => {
  await sequelize.close(); // Ferme la connexion après tous les tests
});

describe('API /api/patients', () => {
  it('GET /api/patients should return empty array initially', async () => {
    const res = await request(app).get('/api/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('POST /api/patients should create a patient', async () => {
    const newPatient = {
      nom: "Dupont",
      prenom: "Jean",
      date_naissance: "1990-01-01",
      sexe: "M",
      domicile: "123 rue A",
      numero: "0123456789",
      groupe_sanguin: "A+",
      poids: 70,
      tension_arterielle: "120/80",
      allergies: "aucune",
      alertes: "aucune"
    };

    const res = await request(app)
      .post('/api/patients')
      .send(newPatient);

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe("Dupont");
    expect(res.body).toHaveProperty('id');
  });

  it('GET /api/patients should return the newly created patient', async () => {
    const res = await request(app).get('/api/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nom).toBe("Dupont");
  });
});
