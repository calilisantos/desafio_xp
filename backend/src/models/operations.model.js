const { Asset, Client, Custody, Operation } = require('../database/models');
const {getByAsset} = require('./assets.model')
const { getBalanceById } = require('./accounts.model');
const { Op } = require("sequelize");

const newAsk = async ({
  asset_id,
  client_id,
  operation_type = 'ask',
  operation_price,
  operation_qtd}) => {
  // busca as informações da ação em negociação
  const assetInfo = await getByAsset(asset_id)

  // se a qtd. de ações da ordem for maior que a qtd. total de ações, a operação não anda.
  if (operation_qtd > assetInfo.shares) return false
  
  // busca o saldo do cliente que vende => debug: chega ok!
  const shortClient = await getBalanceById(client_id);
  
  // busca a custódia do cliente que vende => debug: chega ok!
  const custodyShort = await Custody.findOne({ where:{asset_id, client_id}});

  // valor da operação para atualizar o saldo dos clientes => debug: chega ok!
  const orderValue = Number(operation_price) * Number(operation_qtd);

  // procura uma operação de compra que dê match com essa nova => debug: chega ok!
  const matchingBid = await Operation.findOne({
    where: {
      [Op.and]: [
        {asset_id:{[Op.eq]: [asset_id]}}, {operation_type: 'bid'},
        {operation_price: {[Op.eq]: [operation_price]}},
        {operation_qtd: {[Op.eq]: [operation_qtd]}},
        {operation_status: 'open'},
      ],
    }
  });

  // se não existir ordem que dê matching, abre a ordem de venda e encerra a função => debug: chega ok!
  if (!matchingBid) {
    return await Operation.create({asset_id, client_id, operation_type:'ask', operation_price, operation_qtd});
  };

  // atualiza status da operação que deu match
  await Operation.update({operation_status: 'close'}, { 
    where: 
      {[Op.and]:[
        {asset_id:{[Op.eq]: [asset_id]},
          client_id: matchingBid.client_id,
          operation_type: 'bid',
          operation_price: {[Op.eq]: [operation_price]},
          operation_qtd: {[Op.eq]: [operation_qtd]},
          operation_status: 'open',
          operation_id: matchingBid.operation_id 
        }]
      } 
  });

  // busca o saldo do cliente que abriu a ordem de compra que deu match => debug: chega ok!
  const longClient = await getBalanceById(matchingBid.client_id);
 
  // busca os dados de custódia do cliente que abriu a ordem de compra que deu match => debug: chega ok!
  const custodyLong =  await Custody.findOne({ where: { asset_id, client_id: longClient.client_id} });

  // atualiza o preço da ação com os valores da ordem que deu matching => debug: chega ok!
  await Asset.update({price: operation_price}, { where: {asset_id}});

  // caso a operação seja feita por outro cliente,segue-se esse fluxo
  if (client_id !== longClient.client_id) {
  // atualiza o saldo do cliente que vendeu a ação => debug: chega ok!
  await Client.update({balance: Number(shortClient.balance) + orderValue}, { where: {client_id}});
 
  // atualiza o saldo do cliente que comprou a ação => debug: chega ok!
  await Client
    .update({balance: Number(longClient.balance) - orderValue}, {
      where: {client_id: longClient.client_id}
      }
    );

  // se o cliente que compŕa não possui a ação, cria uma custódia dessa ação => debug: criação ok!
  if (!custodyLong) { 
    await Custody.create({asset_id, client_id: longClient.client_id, custody_qtd: operation_qtd});
    return await Operation
      .create({asset_id,
        client_id,
        operation_type,
        operation_price,
        operation_qtd,
        operation_status: 'close'
    });
  }

  // atualiza a quantidade em custódia do cliente que comprou a ação => debug: chega ok!
  const newLongShares = (Number(custodyLong.custody_qtd) + Number(operation_qtd))
  await Custody
    .update({custody_qtd: newLongShares}, {
      where: {[Op.and]:[{asset_id, client_id: longClient.client_id}]} 
    });
}
  
  // finaliza a ordem 
  const closeOrder = await Operation
    .create({asset_id,
      client_id,
      operation_type,
      operation_price,
      operation_qtd,
      operation_status: 'close'
    });

  // se a qtd. de ações da ordem for maior que a qtd. total em carteira, a operação não anda.
  if (operation_qtd > custodyShort.custody_qtd) return false

  // atualiza a quantidade em custódia do cliente que vendeu a ação => debug: criação ok!
  const newShortShares = (Number(custodyShort.custody_qtd) - Number(operation_qtd));
  await Custody.update({custody_qtd: newShortShares}, {where: {[Op.and]:[{asset_id, client_id}]}});

  return closeOrder;
};

const newBid = async ({
  asset_id,
  client_id,
  operation_type = 'bid',
  operation_price,
  operation_qtd}) => {
  // busca as informações da ação em negociação
  const assetInfo = await getByAsset(asset_id)

  // se a qtd. de ações da ordem for maior que qtd. total de ações, a operação não anda.
  if (operation_qtd > assetInfo.shares) return false
  
  // busca o saldo do cliente que compra => debug: chega ok!
  const longClient = await getBalanceById(client_id);

  // busca a custódia do cliente que compra => debug: chega ok!
  const custodyLong = await Custody.findOne({ where:{asset_id, client_id}});

  // valor da compra para atualizar o saldo dos clientes => debug: chega ok!
  const orderValue = Number(operation_price) * Number(operation_qtd);

  // procura uma operação de venda que dê match com essa nova => debug: chega ok!
  const matchingAsk = await Operation.findOne({
    where: {
      [Op.and]: [
        {asset_id:{[Op.eq]: [asset_id]}}, {operation_type: 'ask'},
        {operation_price: {[Op.eq]: [operation_price]}},
        {operation_qtd: {[Op.eq]: [operation_qtd]}},
        {operation_status: 'open'},
      ],
    }
  });

  // se não existir ordem que dê matching, abre a ordem de compra e encerra a função => debug: chega ok!
  if (!matchingAsk) {
    return await Operation.create({asset_id, client_id, operation_type:'bid', operation_price, operation_qtd});
  };

  // atualiza status da operação que deu match
  await Operation.update({operation_status: 'close'}, { 
    where: 
      {[Op.and]:[
        {asset_id:{[Op.eq]: [asset_id]},
          client_id: matchingAsk.client_id,
          operation_type: 'ask',
          operation_price: {[Op.eq]: [operation_price]},
          operation_qtd: {[Op.eq]: [operation_qtd]},
          operation_status: 'open',
          operation_id: matchingAsk.operation_id 
        }]
      } 
  });

  // busca o saldo do cliente que abriu a ordem de venda que deu match => debug: chega ok!
  const shortClient = await getBalanceById(matchingAsk.client_id);
 
  // busca os dados de custódia do cliente que abriu a ordem de venda que deu match => debug: chega ok!
  const custodyShort =  await Custody.findOne({ where: { asset_id, client_id: shortClient.client_id} });

  // atualiza o preço e quantidade da ação com os valores da ordem que deu matching => debug: chega ok!
  await Asset.update({price: operation_price}, { where: {asset_id}});

  if (client_id !== shortClient.client_id) {
  // atualiza o saldo do cliente que comprou a ação => debug: chega ok!
  await Client.update({balance: Number(longClient.balance) - orderValue}, { where: {client_id}});
 
  // atualiza o saldo do cliente que vendeu a ação => debug: chega ok!
  await Client
    .update({balance: Number(shortClient.balance) + orderValue}, {
      where: {client_id: shortClient.client_id}
      }
    );

  // atualiza a quantidade em custódia do cliente que vendeu a ação => debug: chega ok!
  const newShortShares = (Number(custodyShort.custody_qtd) - Number(operation_qtd))
  await Custody
    .update({custody_qtd: newShortShares}, {
      where: {[Op.and]:[{asset_id, client_id: shortClient.client_id}]} 
    });
}
  
  // finaliza a ordem de compra
  const closeOrder = await Operation
    .create({asset_id,
      client_id,
      operation_type,
      operation_price,
      operation_qtd,
      operation_status: 'close'
    });

  // se o cliente que comprou não possui a ação, cria uma custódia dessa ação => debug: criação ok!
  if (!custodyLong) { 
    await Custody.create({asset_id, client_id, custody_qtd: operation_qtd});
    return closeOrder;
  }

  // atualiza a quantidade em custódia do cliente que comprou a ação => debug: criação ok!
  const newLongShares = (Number(custodyLong.custody_qtd) + Number(operation_qtd));
  await Custody.update({custody_qtd: newLongShares}, {where: {[Op.and]:[{asset_id, client_id}]}});

  return closeOrder;
};

module.exports = { newAsk, newBid };
