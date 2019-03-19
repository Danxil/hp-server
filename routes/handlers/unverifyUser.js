import { unverifyUser } from '../../controllers/user';

export default () => async ({ params: { userId } }, res) => {
  try {
    await unverifyUser({ userId });
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(400);
  }
};
