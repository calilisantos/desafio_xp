module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Clients',
      [{
        username: 'guido_rossum',
        password: 'conda3.10',
        balance: 5000.25,
      },
      {
        username: 'linus_t',
        password: '1amsatoshi',
        balance: 10000,
      },
      {
        username: 'bench_gui',
        password: 'b1gdream',
        balance: 100000,
      },
      {
        username: 'will_gates',
        password: 'g0odguy',
        balance: 20000,
      },
      {
        username: 'maffra_t',
        password: 'Db0ss',
        balance: 50000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Clients', null, {})
  }
};
