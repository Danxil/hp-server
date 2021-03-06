import { getTariffs } from './tariffs';

export const signUp = async ({ email, password, invitedById, displayName, accountType }) => {
  const user = await global.db.User.findOne({ where: { email } });

  if (user) {
    throw new Error(`User with email ${email} is already exist`);
  }
  const newUser = await global.db.User.create({
    email,
    password,
    invitedById,
    accountType,
    displayName,
  });
  const tariffs = await getTariffs();
  const userBalances = tariffs.map(i => ({
    userId: newUser.id,
    tariffId: i.id,
  }));
  const userBalancesResult = await global.db.UserBalance.bulkCreate(
    userBalances,
    { returning: true },
  );
  return { ...newUser.toJSON(), userBalances: userBalancesResult };
};
export const getReferrals = async ({ userId }) => {
  return global.db.User.findAll({ where: { invitedById: userId } });
};
export const unverifyUser = async ({ userId }) => {
  await global.db.User.update({ verified: false }, { where: { id: userId } });
};
export const getUsersForAdminStatistic = async () => {
  return global.db.User.findAll({
    include: [
      { model: global.db.Withdraw, include: [global.db.User] },
      global.db.Replenishment,
    ],
    order: [
      ['createdAt', 'DESC'],
      ['accountType', 'DESC'],
    ],
  });
};
