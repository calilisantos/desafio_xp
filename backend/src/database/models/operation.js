const Operation = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    operation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    asset_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    operation_type: DataTypes.STRING,
    operation_date: {
      type: DataTypes.DATE, 
      defaultValue: sequelize.fn('now')
    },
    operation_price: DataTypes.DECIMAL,
    operation_qtd: DataTypes.INTEGER,
    operation_status: DataTypes.STRING,
  }, 
  { 
    timestamps: false,
    tableName: 'Operations', 
  });

  return Operation;
};

module.exports = Operation;
