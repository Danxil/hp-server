module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'BEGINNER',
        duration: 7,
        minInvestment: 10,
        percentage: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BASE',
        duration: 5,
        minInvestment: 25,
        percentage: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADVANCED',
        duration: 3,
        minInvestment: 50,
        percentage: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'EXPERT',
        duration: 2,
        minInvestment: 100,
        percentage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tariffs', null);
  },
};
