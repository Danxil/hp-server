import { getAll } from '../../controllers/investments';
import { getReferrals } from '../../controllers/user';

export default () => async ({ user: { id: userId } }, res) => {
  const referrals = await getReferrals({ userId });
  const investments = await getAll({ userId });
  const totalInvested = investments.reduce((prev, { amount }) => prev + amount);
  const result = referrals.map(referral => ({ ...referral, totalInvested }));
  return res.send(result);
};
