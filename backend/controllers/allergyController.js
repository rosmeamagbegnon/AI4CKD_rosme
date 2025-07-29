const Allergy = require('../models/allergyModel');

// Ajouter une allergie
exports.addAllergy = async (patientId, data) => {
  try {
    const allergy = await Allergy.create({ patient_id: patientId, ...data });
    return allergy;
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout de l'allergie : ${error.message}`);
  }
};

// Récupérer les allergies d’un patient
exports.getAllergies = async (patientId) => {
  try {
    const allergies = await Allergy.findAll({ where: { patient_id: patientId } });
    return allergies;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des allergies : ${error.message}`);
  }
};

// Mettre à jour une allergie
exports.updateAllergy = async (id, data) => {
  try {
    const allergy = await Allergy.findByPk(id);
    if (!allergy) {
      throw new Error('Allergie non trouvée');
    }
    await allergy.update(data);
    return allergy;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour : ${error.message}`);
  }
};

// Supprimer une allergie
exports.deleteAllergy = async (id) => {
  try {
    const allergy = await Allergy.findByPk(id);
    if (!allergy) {
      throw new Error('Allergie non trouvée');
    }
    await allergy.destroy();
    return { message: 'Allergie supprimée avec succès' };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression : ${error.message}`);
  }
};
