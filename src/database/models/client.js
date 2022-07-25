const Client = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Clients',
  });

  return Client;
};

Client.associate = ({Deposit}) => {
  Client.hasMany(Deposit,
    { 
      as: 'deposits', 
      foreignKey: 'client_id' 
    });
};

Client.associate = ({Withdraw}) => {
  Client.hasMany(Withdraw,
    { 
      as: 'withdraws', 
      foreignKey: 'client_id' 
    });
};

Client.associate = ({Operation}) => {
  Client.hasMany(Operation,
    { 
      as: 'operations', 
      foreignKey: 'client_id' 
    });
};

module.exports = Client;
