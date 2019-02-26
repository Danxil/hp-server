module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        id: 1,
        name: 'BEGINNER',
        duration: 7,
        minInvestment: 10,
        percentage: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'BASE',
        duration: 5,
        minInvestment: 25,
        percentage: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'ADVANCED',
        duration: 3,
        minInvestment: 50,
        percentage: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'EXPERT',
        duration: 2,
        minInvestment: 100,
        percentage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'TEST',
        duration: 1,
        minInvestment: 0.2,
        percentage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: () => {
    return Promise.resolve();
  },
};
