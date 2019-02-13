import { createWithdraw } from '../../controllers/withdraws';

export default () => async (req, res) => {
  const { amount, method, requisite } = req.body;
  const { balance, id: userId } = req.user;
  if (balance - amount < 0) {
    return res.status(400).send('Not enough balance');
  }
  await req.user.update({ balance: balance - amount });
  const withdraw = await createWithdraw({
    amount,
    userId,
    method,
    requisite,
  });
  return res.status(200).send({ ...withdraw.toJSON(), user: req.user });
};
