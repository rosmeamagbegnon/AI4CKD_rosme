'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnostics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'patients', // nom exact de la table cible en base
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dfg: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      proteine: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      taille_rein: {
        type: Sequelize.ENUM('normale', 'réduite'),
        allowNull: false
      },
      symptomes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      resultat: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {  // si tu veux gérer les timestamps
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diagnostics');
  }
};
