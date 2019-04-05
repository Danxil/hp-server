import Sequelize from 'sequelize';

export default (sequelize) => {
  const Game = sequelize.define('Game', {
    bet: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    spinInProgress: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    lastTouchAt: {
      type: Sequelize.DATE,
    },
  }, {
    name: {
      singular: 'game',
      plural: 'games',
    },
  });

  Game.associate = (models) => {
    models.Game.belongsTo(models.User, { foreignKey: 'creatorUserId', as: 'creatorUser' });
    models.Game.belongsTo(models.User, { foreignKey: 'connectedUserId', as: 'connectedUser' });
  };

  return Game;
};
