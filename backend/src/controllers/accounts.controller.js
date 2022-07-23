const accountsServices = require('../services/accounts.service');

const getBalanceById = async (req, res) => {
  const { id } = req.params;
  const clientBalance = await accountsServices.getBalanceById(id);
  if (clientBalance.status) return res.status(clientBalance.status).json(clientBalance.message);
  return res.status(200).json(clientBalance);
};

const newDeposit = async (req, res) => {
  const depositInfo = await accountsServices.newDeposit(req.body);
  if (depositInfo.status) return res.status(depositInfo.status).json(depositInfo.message);
  return res.status(200).json(depositInfo);
};

module.exports = { getBalanceById, newDeposit };
