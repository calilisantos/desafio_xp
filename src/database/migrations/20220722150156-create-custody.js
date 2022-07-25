'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CustodiesTable = queryInterface.createTable('Custodies', {
      asset_id: {
        allowNull: false,
        primaryKey: true,
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
        primaryKey: true,
        references: {
          model: 'Clients',
          key: 'client_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      custody_qtd: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
    return CustodiesTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Custodies');
  }
};