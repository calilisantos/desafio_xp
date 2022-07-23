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
  }, 
  { 
    timestamps: false,
    tableName: 'Custodies',
  });

  Custody.associate = ({Asset, Client}) => {
    Asset.belongsToMany(Client,
      { 
        as: 'client',
        through: Custody,
        foreignKey: 'client_id',
        otherKey: 'asset_id', 
      });
    Client.belongsToMany(Asset,
      { 
        as: 'asset',
        through: Custody,
        foreignKey: 'asset_id',
        otherKey: 'client_id', 
      });
  };

  return Custody;
};

module.exports = Custody;
