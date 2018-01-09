'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      botanicalName: {
        type: Sequelize.STRING
      },
      light: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.STRING
      },
      humidity: {
        type: Sequelize.STRING
      },
      water: {
        type: Sequelize.STRING
      },
      soil: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plants');
  }
};