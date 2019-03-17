const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface) => {
    try {
      const userRes = await queryInterface.bulkInsert('Users', [{
        password: 'admin666',
        isAdmin: true,
        balance: 100,
        accountType: 'investor',
        email: 'admin@admin.admin',
        createdAt: new Date(null),
        updatedAt: new Date(null),
      }], { returning: true });
      const tariffsRes = await queryInterface.sequelize.query('SELECT id from "Tariffs";');
      await queryInterface.bulkInsert('UserBalances', tariffsRes[0].map(i => ({
        userId: userRes[0].id,
        tariffId: i.id,
        createdAt: new Date(null),
        updatedAt: new Date(null),
      })));
    } catch (e) {
      console.log(e);
    }
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('UserBalances', { createdAt: { [Op.eq]: new Date(null) } });
    await queryInterface.bulkDelete('Users', { createdAt: { [Op.eq]: new Date(null) } });
  },
};
