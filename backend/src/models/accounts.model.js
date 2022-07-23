const { Client, Deposit, Withdraw } = require('../database/models')

const getBalanceById = async (client_id) => {
  const clientBalance = await  Client.findOne({
    attributes: ['username', 'balance'],
    where: {client_id},
  });
  return clientBalance;
};

const newDeposit = async ({client_id, deposit_value}) => {
  const client = await getBalanceById(client_id);
  if(!client) return false
  const deposit = await Deposit.create({ client_id, deposit_value});
  await Client.update(
    {balance: Number(client.balance) + Number(deposit_value)},
    { where: {client_id}},
  )
  return `Deposit of $${deposit.deposit_value} made successfully. New balance of ${client.balance} `;
  };

const newWithdraw = async ({client_id, withdraw_value}) => {
  const client = await getBalanceById(client_id);
  if(!client) return false
  const withdraw = await Withdraw.create({ client_id, withdraw_value});
  await Client.update(
    {balance: Number(client.balance) - Number(withdraw_value)},
    { where: {client_id}},
  )
  return `Withdraw of $${withdraw.withdraw_value} made successfully. New balance of ${client.balance} `;
  };

module.exports = { getBalanceById, newDeposit, newWithdraw };