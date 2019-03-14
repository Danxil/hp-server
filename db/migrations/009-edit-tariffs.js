module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tariffs', 'minReliability', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('Tariffs', 'maxReliability', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Tariffs', 'minReliability');
    await queryInterface.removeColumn('Tariffs', 'maxReliability');
  },
};
