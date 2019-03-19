import { getNotVerifiedUsers } from '../../controllers/user';

export default () => async (req, res) => {
  const users = await getNotVerifiedUsers();
  return res.send(users);
};
