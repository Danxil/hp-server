import { Op } from 'sequelize';
import { USER_REFERENCE_PERCENTAGE } from '../businessConfig';

export const getAll = async ({ userId }) => {
  const investments = await global.db.Investment.findAll({
    where: { userId },
    include: [global.db.User, global.db.Tariff],
  });
  return investments;
};
export const getTotalInvested = async ({ userId }) => {
  const investments = await getAll({ userId });
  return investments.reduce((prev, { amount }) => prev + amount, 0);
};
export const createReplenishment = async ({
  amount,
  userId,
  tariffId,
  orderId,
}) => {
  const replenishment = await global.db.Replenishment.create({
    amount,
    userId,
    tariffId,
    orderId,
  });
  const user = await global.db.User.find({ where: { id: userId } });
  if (user.invitedById) {
    await user.update({ balance: user.balance + (amount * (USER_REFERENCE_PERCENTAGE / 100)) });
  }
  return replenishment;
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
