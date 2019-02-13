import { getAll } from '../../controllers/investments';

export default () => async (req, res) => {
  const list = await getAll({ userId: req.user.id });
  return res.send(list);
};
