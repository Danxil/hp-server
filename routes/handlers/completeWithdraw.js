import { completeWithdraw } from '../../controllers/withdraws';

export default () => async (req, res) => {
  const { params: { withdrawId } } = req;
  await completeWithdraw({
    withdrawId,
  });
  return res.send(200);
};
