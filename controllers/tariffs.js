export const getTariffs = async () => {
  return global.db.Tariffs.findAll();
};
