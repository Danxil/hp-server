import express from 'express';
import expressSslify from 'express-sslify';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';
import configurePassport from './configs/configurePassport';
import configureSessions from './configs/configureSessions';
import configureSchedules from './configs/configureSchedules';
import './db/models';

(async () => {
  const app = express();
  if (process.env.NODE_ENV === 'production') app.use(expressSslify.HTTPS({ trustProtoHeader: true }));

  app.use(cookieParser());
  app.use(bodyParser.json({ extended: true }));
  await configureSessions({ app });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'client'), { index: false, extensions: false, redirect: false }));
  configurePassport({ db: global.db, app });

  app.listen(process.env.PORT, () => console.log('REST started'));

  await configureSchedules();

  routes({ app });

  process.on('SIGTERM', () => {
    console.log('SIGTERM');
    global.db.sequelize.close()
    .then(() => {
      console.log('SIGTERM done');
      return process.exit(0);
    })
    .catch((err) => {
      console.log('SIGTERM failed', err);
    });
  });
})();
