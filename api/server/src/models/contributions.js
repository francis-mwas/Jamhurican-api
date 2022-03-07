module.exports = (sequelize, DataTypes) => {
  const contributions = sequelize.define(
    'contributions',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateDeposited: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          contributions.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            allowNull: false,
          });
        },
      },
    }
  );
  return contributions;
};
