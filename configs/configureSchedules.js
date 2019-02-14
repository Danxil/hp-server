import schedule from 'node-schedule';
import { handleInvestments } from '../controllers/investments';

export default () => {
  schedule.scheduleJob('0 * * * * *', () => {
    try {
      handleInvestments();
    } catch (e) {
      console.log(e);
    }
  });
};
