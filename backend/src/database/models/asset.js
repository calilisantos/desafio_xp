const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    asset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
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

module.exports = Asset;