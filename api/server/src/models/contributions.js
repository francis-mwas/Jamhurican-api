'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contributions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contributions.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateDeposited: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // balance: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'contributions',
    }
  );
  return contributions;
};
