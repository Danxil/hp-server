import getTariffs from './tariffs';

export const signUp = async ({ email, password, nickname, invitedById }) => {
  const user = await global.db.User.findOne({ where: { email } });

  if (user) {
    throw new Error(`User with email ${email} is already exist`);
  }
  const newUser = await global.db.User.create({
    email,
    displayName: nickname,
    password,
    invitedById,
  });
  const tariffs = await getTariffs();
  const userBalances = tariffs.map(i => ({
    userId: newUser.id,
    tariffId: i.id,
  }));
  await global.db.UserBalances.bulkInsert(userBalances);
  return newUser;
};
export const getReferrals = async ({ userId }) => {
  return global.db.User.findAll({ where: { invitedById: userId } });
};
