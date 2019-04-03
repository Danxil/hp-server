import { getTotalReplenished } from '../../controllers/replenishment';
import { getReferrals } from '../../controllers/user';

export default () => async ({ user: { id: userId } }, res) => {
  const referrals = await getReferrals({ userId });
  const referralsInvested = await Promise.all(
    referrals.map(referral => getTotalReplenished({ userId: referral.id })),
  );
  const result = referrals.map((referral, index) => ({
    ...referral.toJSON(),
    totalReplenished: referralsInvested[index],
  }));
  return res.send(result);
};
