export const getTariffs = async () => {
  return global.db.Tariff.findAll();
};
export const getTariff = async ({ id }) => {
  return global.db.Tariff.find({ where: { id } });
};
