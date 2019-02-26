module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tariffs', [
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
