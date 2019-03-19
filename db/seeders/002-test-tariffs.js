module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
      {
        name: 'TEST',
        maxDuration: 1,
        minDuration: 5,
        minReliability: 50,
        maxReliability: 99,
        minReplenishment: 1,
        minCredit: 15,
        maxCredit: 25,
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
