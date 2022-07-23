const { Asset } = require('../database/models')

const getAllAssets = async () => {
  const assets = await Asset.findAll({
    attributes: ['ticket', 'shares', 'price'],
  });
  return assets;
}

const getByAsset = async (asset_id) => {
  const asset = await  Asset.findOne({
    attributes: ['ticket', 'shares', 'price'],
    where: {asset_id},
  });
  return asset;
}

module.exports = { getAllAssets, getByAsset };