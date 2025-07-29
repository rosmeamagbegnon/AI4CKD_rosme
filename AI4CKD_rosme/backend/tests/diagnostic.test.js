// tests/diagnostic.test.js
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../app'); // Assure-toi que ce fichier exporte ton instance Express
const { sequelize, Diagnostic } = require('../models'); // Adapter selon ta structure Sequelize

beforeAll(async () => {
  await sequelize.sync({ force: true }); // ⚠️ Réinitialise la BDD pour les tests
});

afterAll(async () => {
  await sequelize.close();
});

describe('🔬 Diagnostic API', () => {
  let createdId;
  const payload = {
    dfg: 50,
    proteine: true,
    taille_rein: 'réduite',
    symptomes: 'Fatigue, maux de tête',
    patient_id: 1
  };

  it('✅ crée un diagnostic', async () => {
    const res = await request(app)
      .post('/api/diagnostics')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('resultat');
    expect(res.body.resultat).toContain('Stade : 3A');
    createdId = res.body.id;
  });

  it('📥 liste tous les diagnostics', async () => {
    const res = await request(app).get('/api/diagnostics');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('🔍 récupère un diagnostic par ID', async () => {
    const res = await request(app).get(`/api/diagnostics/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it('✏️ met à jour un diagnostic', async () => {
    const update = { dfg: 25, proteine: false, taille_rein: 'normale' };
    const res = await request(app).put(`/api/diagnostics/${createdId}`).send(update);
    expect(res.statusCode).toBe(200);
    expect(res.body.resultat).toContain('Stade : 3B');
  });

  it('❌ supprime un diagnostic', async () => {
    const res = await request(app).delete(`/api/diagnostics/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Diagnostic supprimé avec succès' });
  });

  it('🔍 renvoie 404 pour un diagnostic introuvable', async () => {
    const res = await request(app).get('/api/diagnostics/9999');
    expect(res.statusCode).toBe(404);
  });
});
