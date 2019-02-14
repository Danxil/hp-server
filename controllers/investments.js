import { Op } from 'sequelize';

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
export const handleInvestment = async (investment) => {
  let newBalance = investment.user.balance + (
    (investment.tariff.percentage / 100) * investment.amount
  );

  if (investment.daysLeft === 1) newBalance += investment.amount;

  await investment.user.update({
    balance: newBalance,
  });
  await investment.update({ daysLeft: investment.daysLeft - 1 });
};
export const handleInvestments = async () => {
  const investments = await global.db.Investment.findAll({
    where: {
      daysLeft: {
        [Op.gt]: 0,
      },
    },
    include: [global.db.User, global.db.Tariff],
  });
  return Promise.all(investments.map(handleInvestment));
};
