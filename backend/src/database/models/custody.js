'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custody.init({
    custody_qtd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Custody',
  });
  return Custody;
};