module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'BEGINNER',
        duration: 2,
        minInvestment: 10,
        percentage: 8,
        minReliability: 60,
        maxReliability: 69,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BASE',
        duration: 7,
        minInvestment: 25,
        percentage: 5,
        minReliability: 70,
        maxReliability: 79,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADVANCED',
        duration: 14,
        minInvestment: 50,
        percentage: 3,
        minReliability: 80,
        maxReliability: 89,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'EXPERT',
        duration: 30,
        minInvestment: 100,
        percentage: 2,
        minReliability: 90,
        maxReliability: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tariffs', null);
  },
};
