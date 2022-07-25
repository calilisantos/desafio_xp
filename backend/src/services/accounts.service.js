const accountsModels = require('../models/accounts.model');

const getBalanceById = async (id) => {
  const clientBalance = await accountsModels.getBalanceById(id);
  if (!clientBalance) return { status: 404, message: 'Client not found' };
  return clientBalance;
};

const newDeposit = async (infos) => {
  const depositInfo = await accountsModels.newDeposit(infos);
  if (!depositInfo) return { status: 404, message: 'Client not found' };
  if (depositInfo.deposit_value <= 0) return { status: 400, message: '"deposit_value" must be at least 1' };
  return depositInfo;
};

const newWithdraw = async (infos) => {
  const withdrawInfo = await accountsModels.newWithdraw(infos);
  if (!withdrawInfo) return { status: 404, message: 'Client not found' };
  if (withdrawInfo.withdraw_value <= 0) return { status: 400, message: '"withdraw_value" must be at least 1' };
  return withdrawInfo;
};

module.exports = { getBalanceById, newDeposit, newWithdraw };
