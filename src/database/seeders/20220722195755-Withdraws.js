module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Withdraws',
      [{
        client_id: 2,
        withdraw_value: 1000,
      },
      {
        client_id: 4,
        withdraw_value: 1000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Withdraws', null, {})
  }
};
