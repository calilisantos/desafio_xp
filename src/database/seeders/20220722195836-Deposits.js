module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Deposits',
      [{
        client_id: 3,
        deposit_value: 500,
      },
      {
        client_id: 5,
        deposit_value: 1000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Deposits', null, {})
  }
};
