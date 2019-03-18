import passport from 'passport';
import LocalStrategy from 'passport-local';

const localStrategyVerify = () => async (username, password, done) => {
  try {
    const user = await global.db.User.findOne({
      where: { email: username },
      include: [global.db.UserBalance],
    });
    if (!user) {
      console.log('Authentication failed. User not found');
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      console.log('Authentication failed. Password is not correct');
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.log('Authentication failed. Some error', error);
    return done(error);
  }
};

export default ({ app }) => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    localStrategyVerify(),
  ));
  app.post(
    `${process.env.API_PREFIX}/auth/local`,
    passport.authenticate('local'),
    (req, res) => {
      console.log('Authentication success', req.body);
      res.sendStatus(200);
    },
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await global.db.User.findOne({
        where: { id },
        include: [global.db.UserBalance],
      });
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
};
