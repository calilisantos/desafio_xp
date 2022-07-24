'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const WithdrawTable = await queryInterface.createTable('Withdraws', {
      withdraw_id: {
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
      withdraw_date: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      withdraw_value: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
    return WithdrawTable;
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Withdraws');
  }
};
