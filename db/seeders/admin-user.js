module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      password: 'admin666',
      isAdmin: true,
      balance: 100,
      displayName: 'admin',
      email: 'admin@admin.admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: () => {
    return Promise.resolve();
  },
};
