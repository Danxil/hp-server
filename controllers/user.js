export const signUp = async ({ email, password, nickname, invitedById }) => {
  const user = await global.db.User.findOne({ where: { email } });

  if (user) {
    throw new Error(`User with email ${email} is already exist`);
  }
  return global.db.User.create({ email, displayName: nickname, password, invitedById });
};
export const getReferrals = async ({ userId }) => {
  return global.db.User.findAll({ where: { invitedById: userId } });
};
