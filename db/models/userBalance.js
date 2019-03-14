import Sequelize from 'sequelize';

export default (sequelize) => {
  const UserBalance = sequelize.define('UserBalance', {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    name: {
      singular: 'userBalance',
      plural: 'userBalances',
    },
  });

  UserBalance.associate = (models) => {
    models.UserBalance.belongsTo(models.User, { foreignKey: 'userId' });
    models.UserBalance.belongsTo(models.Tariff, { foreignKey: 'tariffId' });
  };

  return UserBalance;
};
