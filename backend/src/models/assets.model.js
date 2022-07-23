const { Asset, Custody } = require('../database/models')

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

const getByClient = async (client_id) => {
  const custodies = await Custody.findAll({
    where: {client_id},
  });
  return custodies
}

module.exports = { getAllAssets, getByAsset, getByClient };