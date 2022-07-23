const assetsServices = require('../services/assets.service');

const getAllAssets = async (_req, res) => {
  const assets = await assetsServices.getAllAssets();
  return res.status(200).json(assets);
};

const getByAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await assetsServices.getByAsset(id);
  if (asset.status) return res.status(asset.status).json(asset.message);
  return res.status(200).json(asset);
};

module.exports = { getAllAssets, getByAsset };
