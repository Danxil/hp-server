export const getAll = async ({ userId }) => {
  const investments = await global.db.Investment.findAll({
    where: { userId },
    include: [global.db.User, global.db.Tariff],
  });
  return investments;
};
export const createInvestment = async ({ amount, userId, tariffId, daysLeft }) => {
  const investment = await global.db.Investment.create({ amount, userId, tariffId, daysLeft });
  return investment;
};
