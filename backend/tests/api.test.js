const request = require('supertest');
const app = require('../app'); // ton app Express

describe('API tests', () => {
  it('GET /api/patients should return all patients', async () => {
    const res = await request(app).get('/api/patients');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
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
    expect(res.statusCode).toEqual(201);
    expect(res.body.nom).toBe("Dupont");
  });

  // Ajoute ici d’autres tests pour les autres routes et contrôleurs...
});
