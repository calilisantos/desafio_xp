const { Asset, Custody } = require('../database/models')

const getAllAssets = async () => {
  const assets = await Asset.findAll({});
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
    where: {client_id}
  });
  const assets = await custodies.map(async({asset_id, custody_qtd}) => {
    const { ticket, price} = await getByAsset(asset_id)
    return { ticket, custody_qtd, price: Number(price)}
  }
  );
  console.log('assets=>', await Promise.all(assets));
  return await Promise.all(assets);
}

module.exports = { getAllAssets, getByAsset, getByClient };