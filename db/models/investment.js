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
    reliability: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
