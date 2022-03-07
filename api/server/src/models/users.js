module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'user',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM({
          values: ['normal-user', 'admin'],
        }),
        defaultValue: 'normal-user',
      },
    },
    {
      classMethods: {
        associate: (models) => {
          users.hasMany(models.contributions, {
            foreignKey: 'userId',
          });
        },
      },
    }
  );
  return users;
};
