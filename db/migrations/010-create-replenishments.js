module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Replenishments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      tariffId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tariffs',
          key: 'id',
        },
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.createTable('UserBalances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      tariffId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tariffs',
          key: 'id',
        },
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
    await queryInterface.removeColumn('Investments', 'orderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeTable('Replenishments');
    await queryInterface.removeTable('UserBalances');
  },
};
