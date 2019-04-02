import { createReplenishment } from '../../controllers/replenishment';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const { amount, tariffId } = req.body;
  const { balance, id: userId } = req.user;

  const tariff = await getTariff({ id: tariffId });

  if (!tariff) return res.status(400).send('Tariff is not exist!');
  if (amount > balance) return res.status(400).send('Low balance!');
  await req.user.update({ balance: balance - amount });
  const investment = await createReplenishment({
    amount: parseFloat(amount),
    userId,
    tariffId,
  });
  return res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
};
