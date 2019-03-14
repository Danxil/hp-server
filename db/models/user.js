export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    paid: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    name: {
      singular: 'user',
      plural: 'users',
    },
  });
  User.associate = (models) => {
    models.User.hasMany(models.User, { foreignKey: 'invitedById', as: 'invitedBy' });
    models.User.hasMany(models.UserBalances, { foreignKey: 'userId' });
  };
  User.prototype.verifyPassword = function (password) {
    return password === this.password;
  };
  return User;
};
