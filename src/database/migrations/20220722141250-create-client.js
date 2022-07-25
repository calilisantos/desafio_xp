'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ClientsTable = await queryInterface.createTable('Clients', {
      client_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      balance: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
    return ClientsTable;
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Clients');
  }
};
