import { getTotalInvested } from '../../controllers/investments';
import { getReferrals } from '../../controllers/user';

export default () => async ({ user: { id: userId } }, res) => {
  const referrals = await getReferrals({ userId });
  const referralsInvested = await Promise.all(
    referrals.map(referral => getTotalInvested({ userId: referral.id })),
  );
  const result = referrals.map((referral, index) => ({
    ...referral.toJSON(),
    totalInvested: referralsInvested[index],
  }));
  return res.send(result);
};
