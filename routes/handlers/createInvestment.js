import { createInvestment } from '../../controllers/investments';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const { amount, tariffId, userId } = req.body;

  const tariff = await getTariff({ id: tariffId });

  if (!tariff || amount < tariff.minInvestment) return res.status(400).send('Low amount or tariff is not exist!');
  const investment = await createInvestment({
    amount,
    userId,
    tariffId,
    daysLeft: tariff.duration,
  });
  return res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
};
