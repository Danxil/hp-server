module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'invitedById', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },
  down: queryInterface => queryInterface.removeColumn('Users', 'invitedById'),
};
