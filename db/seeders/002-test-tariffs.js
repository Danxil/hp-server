module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'TEST',
        maxDuration: 1,
        minDuration: 5,
        minReliability: 1,
        maxReliability: 99,
        minReplenishment: 1,
        minCredit: 1,
        maxCredit: 25,
        percentage: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tariffs', { id: 6 });
  },
};
