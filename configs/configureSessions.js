import session from 'express-session';

const SequelizeStore = require('connect-session-sequelize')(session.Store);

export default async ({ app }) => {
  const store = new SequelizeStore({
    db: global.db.sequelize,
  });
  const sessionParser = session({
    secret: process.env.APP_SESSION_SECRET,
    store,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    expiration: 24 * 60 * 60 * 1000,
    cookie: {
      secure: false,
    },
  });
  app.use(sessionParser);
  await store.sync();
  return sessionParser;
};
