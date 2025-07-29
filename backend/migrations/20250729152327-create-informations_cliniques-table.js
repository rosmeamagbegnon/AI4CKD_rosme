'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('informations_cliniques', {
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
          model: 'patients',  // nom exact de la table parent
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      groupeSanguin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      poids: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      tensionArterielle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      alertes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      allergies: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: { // si tu veux les timestamps
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
    await queryInterface.dropTable('informations_cliniques');
  }
};
