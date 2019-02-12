module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      paid: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('Users');
  },
};
