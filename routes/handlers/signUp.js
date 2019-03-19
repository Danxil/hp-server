import { errorResponse } from '../../helpers/responses';
import { signUp } from '../../controllers/user';

export default () => async (req, res) => {
  try {
    const user = await signUp(req.body);
    req.login(user, () => res.status(200).send(user));
  } catch (err) {
    console.error(err);
    res.status(400).send(errorResponse(err.message));
  }
};
