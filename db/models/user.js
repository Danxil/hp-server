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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isBot: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    name: {
      singular: 'user',
      plural: 'users',
    },
  });
  User.associate = (models) => {
    models.User.hasMany(models.User, { foreignKey: 'invitedById', as: 'invitedBy' });
    models.User.hasMany(models.UserBalance, { foreignKey: 'userId' });
  };
  User.prototype.verifyPassword = function (password) {
    return password === this.password;
  };
  return User;
};
