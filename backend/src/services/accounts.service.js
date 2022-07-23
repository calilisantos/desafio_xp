const accountsModels = require('../models/accounts.model');

const getBalanceById = async (id) => {
  const clientBalance = await accountsModels.getBalanceById(id);
  if (!clientBalance) return { status: 404, message: 'Client not found' };
  return clientBalance;
};

module.exports = { getBalanceById };
