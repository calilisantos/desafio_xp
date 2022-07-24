'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const AssetsTable = await queryInterface.createTable('Assets', {
      asset_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shares: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ticket: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
    return AssetsTable;
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Assets');
  }
};