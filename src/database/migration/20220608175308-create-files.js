'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, //nao pode ser nulo
        autoIncrement: true, //registra campo auto incremental
        primaryKey: true //determina registro unico
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('files')
  }
};
