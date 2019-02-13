import { createInvestment } from '../../controllers/investments';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const { amount, tariffId } = req.body;
  const { id: userId } = req.user;

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
