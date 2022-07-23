const { Asset } = require('../database/models')

const getByAsset = async (asset_id) => {
  const asset = await  Asset.findOne({
    attributes: ['ticket', 'shares', 'price'],
    where: {asset_id},
  })
  return asset;
}

module.exports = { getByAsset };