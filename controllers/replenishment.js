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
    await global.db.User.update({
      balance: user.balance + (amount * (USER_REFERENCE_PERCENTAGE / 100)),
    }, {
      where: { id: user.invitedById },
    });
  }
  return replenishment;
};
