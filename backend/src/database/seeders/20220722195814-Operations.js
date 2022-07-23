module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Operations',
      [{
        asset_id: 1,
        client_id: 5,
        operation_type: 'bid',
        operation_price: 19.98,
        operation_qtd: 20,
        operation_status: 'open',
      },
      {
        asset_id: 1,
        client_id: 1,
        operation_type: 'ask',
        operation_price: 20.05,
        operation_qtd: 20,
        operation_status: 'open',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Operations', null, {})
  }
};
