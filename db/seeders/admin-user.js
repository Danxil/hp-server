module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      password: 'admin666',
      isAdmin: true,
      displayName: 'admin',
      email: 'admin@admin.admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', { displayName: 'admin' });
  },
};
