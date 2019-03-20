import Sequelize from 'sequelize';

export default (sequelize) => {
  const Replenishment = sequelize.define('Replenishment', {
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

  Replenishment.associate = (models) => {
    models.Replenishment.belongsTo(models.User, { foreignKey: 'userId' });
    models.Replenishment.belongsTo(models.Tariff, { foreignKey: 'tariffId' });
  };

  return Replenishment;
};
