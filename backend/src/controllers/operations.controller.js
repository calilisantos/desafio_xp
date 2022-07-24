const operationsServices = require('../services/operations.service');

const newBid = async (req, res) => {
  const orderInfo = await operationsServices.newBid(req.body);
  if (orderInfo.status) return res.status(orderInfo.status).json(orderInfo.message);
  return res.status(201).json(orderInfo);
};

module.exports = { newBid };
