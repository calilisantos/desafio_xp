const Deposit = (sequelize, DataTypes) => {
  const Deposit = sequelize.define('Deposit', {
    deposit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: DataTypes.INTEGER,
    deposit_date: {
      type: DataTypes.DATE, 
      defaultValue: sequelize.fn('now')
    },
    deposit_value: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Deposits',
  });

  Deposit.associate = ({Client}) => {
    Deposit.belongsTo(Client,
      { 
        as: 'client',  
        foreignKey: 'client_id' 
      });
  };

  return Deposit;
};

module.exports = Deposit;