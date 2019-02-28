import Sequelize from 'sequelize';

export default (sequelize) => {
  const Investment = sequelize.define('Investment', {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    daysLeft: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    name: {
      singular: 'investment',
      plural: 'investments',
    },
  });

  Investment.associate = (models) => {
    models.Investment.belongsTo(models.User, { foreignKey: 'userId' });
    models.Investment.belongsTo(models.Tariff, { foreignKey: 'tariffId' });
  };

  return Investment;
};
