import { createInvestment } from '../../controllers/investments';
import { getTariff } from '../../controllers/tariffs';

export default () => async (req, res) => {
  try {
    const { amount, tariffId, duration, reliability } = req.body;

    const tariff = await getTariff({ id: tariffId });
    if (!tariff || amount < tariff.minCredit || amount > tariff.maxCredit) {
      throw new Error('Wrong amount or tariff is not exist!');
    }
    const investment = await createInvestment({
      amount,
      tariffId,
      duration,
      reliability,
      user: req.user,
    });
    res.status(200).send({ ...investment.toJSON(), user: req.user, tariff });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
