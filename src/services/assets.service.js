const assetsModels = require('../models/assets.model');

const getAllAssets = async () => {
  const assets = await assetsModels.getAllAssets();
  return assets;
};

const getByAsset = async (id) => {
  const asset = await assetsModels.getByAsset(id);
  if (!asset) return { status: 404, message: 'Asset does not exist' };
  return asset;
};

const getByClient = async (id) => {
  const custodies = await assetsModels.getByClient(id);
  if (!custodies.length) return { status: 404, message: 'Client not found' };
  return custodies;
};

module.exports = { getAllAssets, getByAsset, getByClient };
