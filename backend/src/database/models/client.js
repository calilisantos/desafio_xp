const Client = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
  },
  {
    timestamps: false,
    tableName: 'Clients',
  });

  return Client;
};

module.exports = Client;
