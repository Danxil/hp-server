module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tariffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      minDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minReplenishment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minCredit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      maxCredit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      minReliability: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxReliability: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Tariffs');
  },
};
