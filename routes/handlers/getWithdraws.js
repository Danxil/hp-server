import { getHistory } from '../../controllers/withdraws';

export default () => async (req, res) => {
  const filter = JSON.parse(req.query.filter);
  const history = await getHistory({ filter });
  return res.send(history);
};
