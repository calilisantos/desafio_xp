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

  Operation.associate = ({Asset}) => {
    Operation.belongsTo(Asset,
      { 
        as: 'asset',  
        foreignKey: 'asset_id' 
      });
  };

  Operation.associate = ({Client}) => {
    Operation.belongsTo(Client,
      { 
        as: 'client',  
        foreignKey: 'client_id' 
      });
  };

  return Operation;
};

module.exports = Operation;
