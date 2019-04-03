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
      {
        model: global.db.User,
        as: 'invitedBy',
      },
    ],
  });
  await user.userBalances[0].update({ amount: user.userBalances[0].amount + amount });
  if (user.invitedById && orderId.indexOf('reinvestProfit') === -1) {
    await user.invitedBy.update({
      balance: user.invitedBy.balance + (amount * (USER_REFERENCE_PERCENTAGE / 100)),
    });
  }
  return replenishment;
};
