module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'TEST',
        duration: 1,
        minReliability: 50,
        maxReliability: 99,
        minInvestment: 1,
        percentage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tariffs', { id: 6 });
  },
};
