'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DepositTable = await queryInterface.createTable('Deposits', {
      deposit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'client_id',
        },
        type: Sequelize.INTEGER
      },
      deposit_date: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      deposit_value: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
    return DepositTable;
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Deposits');
  }
};
