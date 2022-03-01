import cuid from 'cuid';

module.exports = (sequelize, DataTypes) => {
  const contributions = sequelize.define(
    'contributions',
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => cuid(),
      },
      amount: {
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
          contributions.belongsTo(models.user, {
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
