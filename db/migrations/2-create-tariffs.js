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
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minInvestment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxInvestment: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
