const { Client } = require('../database/models')

const getBalanceById = async (client_id) => {
  const clientBalance = await  Client.findOne({
    attributes: ['username', 'balance'],
    where: {client_id},
  });
  return clientBalance;
};

module.exports = { getBalanceById };