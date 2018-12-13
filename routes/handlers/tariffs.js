import { getTariffs } from '../../controllers/tariffs';

export default () => async (req, res) => {
  const tariffs = await getTariffs();
  return res.send(tariffs);
};
