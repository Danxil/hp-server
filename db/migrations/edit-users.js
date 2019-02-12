module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    }).then(() => {
      return queryInterface.changeColumn('Users', 'displayName', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    });
  },
  down: () => Promise.resolve(),
};
