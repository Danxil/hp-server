module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Investments', 'daysLeft', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  down: () => Promise.resolve(),
};
