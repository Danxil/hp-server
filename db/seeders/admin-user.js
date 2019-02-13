module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      password: 'admin666',
      isAdmin: true,
      balance: 100,
      displayName: 'admin',
      email: 'admin@admin.admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Withdraws')
    .then(() => queryInterface.bulkDelete('Investments'))
    .then(() => queryInterface.bulkDelete('Users', { displayName: 'admin' }));
  },
};
