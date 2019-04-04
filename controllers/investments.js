import { Op } from 'sequelize';
import moment from 'moment';

export const getAll = async ({ userId }) => {
  const investments = await global.db.Investment.findAll({
    where: { userId },
    include: [global.db.User, global.db.Tariff],
  });
  return investments;
};
export const createInvestment = async ({
  amount,
  tariffId,
  duration,
  reliability,
  user,
}) => {
  const userBalance = user.userBalances.find(o => o.tariffId === tariffId);
  if (userBalance.amount < amount) {
    throw new Error('Low balance');
  }
  const investment = await global.db.Investment.create({
    amount,
    userId: user.id,
    tariffId,
    reliability,
    daysLeft: duration,
    duration,
  });
  await userBalance.update({ amount: userBalance.amount - amount });
  return investment;
};
export const getTotalInvested = async ({ userId }) => {
  const investments = await getAll({ userId });
  return investments.reduce((prev, { amount }) => prev + amount, 0);
};
export const handleInvestment = async (investment) => {
  if (moment(investment.createdAt).hour() !== moment().hour()) return;
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
  investments.reduce(async (previousPromise, investment) => {
    await previousPromise;
    return handleInvestment(investment);
  }, Promise.resolve());
};
