import { createReplenishment } from '../../controllers/investments';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const { amount, tariffId, userId, orderId } = req.body;

  const tariff = await getTariff({ id: tariffId });

  if (!tariff || parseFloat(amount) < tariff.minReplenishment) return res.status(400).send('Low amount or tariff is not exist!');
  const investment = await createReplenishment({
    amount: parseFloat(amount),
    userId,
    tariffId,
    orderId,
  });
  return res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
};
