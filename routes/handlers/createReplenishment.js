import { createReplenishment } from '../../controllers/replenishment';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const { amount, tariffId, userId, orderId } = req.body;
  console.log(11, req.body);

  const tariff = await getTariff({ id: tariffId });

  if (!tariff) return res.status(400).send('Tariff is not exist!');
  if (amount < tariff.minReplenishment) return res.status(400).send('Low amount of replenishment!');
  const investment = await createReplenishment({
    amount: parseFloat(amount),
    userId,
    tariffId,
    orderId,
  });
  return res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
};
