module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Investments', 'orderId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  down: queryInterface => queryInterface.removeColumn('Investment', 'orderId'),
};
