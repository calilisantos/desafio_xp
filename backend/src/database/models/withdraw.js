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
    withdraw_value: DataTypes.DECIMAL,
  },
  {
    timestamps: false,
    tableName: 'Withdraw',
  });

  return Withdraw;
};

module.exports = Withdraw;