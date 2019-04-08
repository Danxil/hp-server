import { getUsersForAdminStatistic } from '../../controllers/user';

export default () => async (req, res) => {
  const users = await getUsersForAdminStatistic();
  return res.send(users);
};
