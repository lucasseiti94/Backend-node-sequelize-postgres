'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, //nao pode ser nulo
        autoIncrement: true, //registra campo auto incremental
        primaryKey: true //determina registro unico
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      canceled_at: {
        type: Sequelize.DATE
      },
      collaborator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('appointments')
  }
};
