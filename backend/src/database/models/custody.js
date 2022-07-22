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
  }, { timestamps: false });

  return Custody;
};

module.exports = Custody;
