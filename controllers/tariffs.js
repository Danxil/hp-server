export const getTariffs = async ({ withTests } = {}) => {
  const tariffs = global.db.Tariff.findAll();
  let result = tariffs;

  if (!withTests) {
    result = tariffs.filter(tariff => tariff.name !== 'TEST');
  }
  return result;
};
export const getTariff = async ({ id }) => {
  return global.db.Tariff.find({ where: { id } });
};
