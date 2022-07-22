module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Custodies',
      [{
        asset_id: 1,
        client_id: 1,
        custody_qtd: 80,
      },
      {
        asset_id: 20,
        client_id: 2,
        custody_qtd: 40,
      },
      {
        asset_id: 15,
        client_id: 3,
        custody_qtd: 20,
      },
      {
        asset_id: 4,
        client_id: 4,
        custody_qtd: 50,
      },
      {
        asset_id: 2,
        client_id: 5,
        custody_qtd: 30,
      },
      {
        asset_id: 3,
        client_id: 5,
        custody_qtd: 30,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Custodies', null, {})
  }
};
