const operationsModels = require('../models/operations.model');
const { getByAsset } = require('../models/assets.model');

const newBid = async (infos) => {
  const assetInfos = await getByAsset(infos.asset_id);
  const orderInfo = await operationsModels.newBid(infos);
  if (assetInfos.shares === 0) return { status: 422, message: `${assetInfos.ticket} is unavaible` };
  if (infos.operation_qtd > assetInfos.shares) return { status: 422, message: '"operation_qtd" must be less or equal than the shares avaible' };
  return orderInfo;
};

module.exports = { newBid };
