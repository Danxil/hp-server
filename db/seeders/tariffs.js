module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'BEGINNER',
        duration: 7,
        minInvestment: 10,
        percentage: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BASE',
        duration: 14,
        minInvestment: 300,
        percentage: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADVANCED',
        duration: 35,
        minInvestment: 1000,
        percentage: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tariffs');
  },
};
