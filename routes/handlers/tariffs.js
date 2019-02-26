import { getTariffs } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const tariffs = await getTariffs({ withTests: req.user.isAdmin });
  return res.send(tariffs);
};
