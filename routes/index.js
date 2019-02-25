import path from 'path';
import signUpHandler from './handlers/signUp';
import userHandler from './handlers/user';
import logoutHandler from './handlers/logout';
import createWithdrawHandler from './handlers/createWithdraw';
import businessConfigHandler from './handlers/businessConfig';
import getWithdrawsHandler from './handlers/getWithdraws';
import getInvestmentsHandler from './handlers/getInvestments';
import getAdminStatistic from './handlers/getAdminStatistic';
import createInvestmentHandler from './handlers/createInvestment';
import tariffsHandler from './handlers/tariffs';

const authorization = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send(401);
  }
  return next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.send(403);
  }
  return next();
};

export default ({ app }) => {
  app.post(`${process.env.API_PREFIX}/sign-up`, signUpHandler());
  app.get(`${process.env.API_PREFIX}/user`, authorization, userHandler());
  // app.get(`${process.env.API_PREFIX}/users`, authorization, userHandler());
  app.get(`${process.env.API_PREFIX}/logout`, authorization, logoutHandler());
  app.get(`${process.env.API_PREFIX}/withdraws`, getWithdrawsHandler());
  app.post(`${process.env.API_PREFIX}/withdraws`, authorization, createWithdrawHandler());
  app.get(`${process.env.API_PREFIX}/investments`, authorization, getInvestmentsHandler());
  app.post(`${process.env.API_PREFIX}/payment-success`, authorization, createInvestmentHandler());
  app.get(`${process.env.API_PREFIX}/business-config`, businessConfigHandler());
  app.get(`${process.env.API_PREFIX}/tariffs`, tariffsHandler());
  app.get(`${process.env.API_PREFIX}/admin-statistic`, authorization, isAdmin, getAdminStatistic());
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
  });
};
