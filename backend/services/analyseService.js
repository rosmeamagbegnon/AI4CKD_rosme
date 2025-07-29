const seuils = {
  tension_max: 140,
  frequence_cardiaque_max: 100,
  glycemie_max: 1.4,
  temperature_max: 38.5
};

function analyserDonnees(data) {
  const alertes = [];

  const [systolique] = data.tension_arterielle?.split('/').map(Number) || [];

  if (systolique && systolique > seuils.tension_max) {
    alertes.push({
      type_alerte: 'Hypertension',
      niveau_gravite: 'critique',
      message: `Tension élevée détectée : ${data.tension_arterielle}`,
    });
  }

  if (data.frequence_cardiaque > seuils.frequence_cardiaque_max) {
    alertes.push({
      type_alerte: 'Tachycardie',
      niveau_gravite: 'modéré',
      message: `Fréquence cardiaque trop élevée : ${data.frequence_cardiaque}`,
    });
  }

  if (data.glycemie > seuils.glycemie_max) {
    alertes.push({
      type_alerte: 'Hyperglycémie',
      niveau_gravite: 'modéré',
      message: `Glycémie élevée : ${data.glycemie}`,
    });
  }

  if (data.temperature > seuils.temperature_max) {
    alertes.push({
      type_alerte: 'Fièvre',
      niveau_gravite: 'faible',
      message: `Température élevée : ${data.temperature}`,
    });
  }

  return alertes;
}

module.exports = { analyserDonnees };
