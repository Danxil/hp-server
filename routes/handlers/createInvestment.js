import { createInvestment } from '../../controllers/investments';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  console.log('Create investment', req.body);
  const { amount, tariffId, userId } = req.body;

  const tariff = await getTariff({ id: tariffId });

  if (!tariff || amount < tariff.minInvestment) return res.send(400);
  const investment = await createInvestment({
    amount,
    userId,
    tariffId,
    daysLeft: tariff.duration,
  });
  return res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
};
