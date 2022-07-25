const Withdraw = (sequelize, DataTypes) => {
  const Withdraw = sequelize.define('Withdraw', {
    withdraw_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: DataTypes.INTEGER,
    withdraw_date: {
      type: DataTypes.DATE, 
      defaultValue: sequelize.fn('now')
    },
    withdraw_value: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Withdraws',
  });

  Withdraw.associate = ({Client}) => {
    Withdraw.belongsTo(Client,
      { 
        as: 'client',  
        foreignKey: 'client_id' 
      });
  };

  return Withdraw;
};

module.exports = Withdraw;