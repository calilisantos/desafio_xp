'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const OperationTable = await queryInterface.createTable('Operations', {
      operation_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asset_id: {
        allowNull: false,
        references: {
          model: 'Assets',
          key: 'asset_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      operation_type: {
        type: Sequelize.STRING
      },
      operation_date: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      operation_price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      operation_qtd: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      operation_status: {
        allowNull: false,
        defaultValue: 'open',
        type: Sequelize.STRING
      },
    });
    return OperationTable;
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Operations');
  }
};
