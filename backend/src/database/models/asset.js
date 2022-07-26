const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    asset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    shares: DataTypes.INTEGER,
    ticket: DataTypes.STRING,
    icon: DataTypes.STRING,	
  },
  {
    timestamps: false,
    tableName: 'Assets',
  });

  return Asset;
};

Asset.associate = ({Operation}) => {
  Asset.hasMany(Operation,
    { 
      as: 'operations', 
      foreignKey: 'asset_id' 
    });
};

module.exports = Asset;