import Sequelize from 'sequelize';

export default (sequelize) => {
  const Replenish = sequelize.define('Replenish', {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    orderId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    name: {
      singular: 'replenishment',
      plural: 'replenishments',
    },
  });

  Replenish.associate = (models) => {
    models.Replenish.belongsTo(models.User, { foreignKey: 'userId' });
    models.Replenish.belongsTo(models.Tariff, { foreignKey: 'tariffId' });
  };

  return Replenish;
};
