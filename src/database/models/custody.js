const Custody = (sequelize, DataTypes) => {
  const Custody = sequelize.define('Custody', {
    asset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    custody_qtd: DataTypes.INTEGER,
  }, { timestamps: false });

  Custody.associate = ({Asset, Client}) => {
    Client.belongsToMany(Asset, { 
      as: 'assets',
      through: Custody,
      foreignKey: 'client_id',
      otherKey: 'asset_id', 
    });
    
    Asset.belongsToMany(Client, { 
      as: 'clients',
      through: Custody,
      foreignKey: 'asset_id',
      otherKey: 'client_id', 
    });
  };

  return Custody;
};

module.exports = Custody;
