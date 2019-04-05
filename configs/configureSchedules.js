import schedule from 'node-schedule';
import { handleInvestments } from '../controllers/investments';
import checkGames from '../socketEvents/handlers/checkGames';
import checkConnectedUsers from '../socketEvents/handlers/checkConnectedUsers';
import addBots from '../socketEvents/handlers/addBots';
import { updateFakes } from '../controllers/fakes';
import {
  GAME_CHECK_INTERVAL,
  GAME_UPDATE_FAKES_INTERVAL,
} from '../businessConfig';

let lastUpdateFakes = new Date(0);

const check = async () => {
  try {
    if (
      new Date().getTime() - lastUpdateFakes.getTime() >= GAME_UPDATE_FAKES_INTERVAL
      // lastUpdateFakes.getTime() === new Date(0).getTime()
    ) {
      await updateFakes();
      lastUpdateFakes = new Date();
    }
    await checkConnectedUsers();
    await checkGames();
    await addBots();
  } catch (e) {
    console.log(e);
  }
  setTimeout(check, GAME_CHECK_INTERVAL);
};

export default () => {
  schedule.scheduleJob('0 0 * * * *', () => {
    try {
      handleInvestments();
    } catch (e) {
      console.log(e);
    }
  });
  check();
};
