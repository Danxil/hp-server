import { USER_REFERENCE_PERCENTAGE } from '../businessConfig';

export const createReplenishment = async ({
  amount,
  userId,
  tariffId,
  orderId = `reinvestProfit_${new Date().getTime()}`,
}) => {
  const replenishment = await global.db.Replenishment.create({
    amount,
    userId,
    tariffId,
    orderId,
  });
  const user = await global.db.User.find({
    where: { id: userId },
    include: [
      {
        model: global.db.UserBalance,
        include: [global.db.Tariff],
        where: { tariffId },
      },
    ],
  });
  await user.userBalances[0].update({ amount: user.userBalances[0].amount + amount });
  if (user.invitedById && orderId.indexOf('reinvestProfit') === -1) {
    const invitedBy = await global.db.User.find({ where: { id: user.invitedById } });
    await invitedBy.update({
      balance: invitedBy.balance + (amount * (USER_REFERENCE_PERCENTAGE / 100)),
    });
  }
  return replenishment;
};
export const getTotalReplenished = async ({ userId }) => {
  const replenishments = await global.db.Replenishment.findAll({ where: { userId } });
  return replenishments.reduce((prev, { amount }) => prev + amount, 0);
};
