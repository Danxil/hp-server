import _ from 'lodash';
import gameSpin from './gameSpin';
import gameUserConnect from './gameUserConnect';
import { getBots } from '../../controllers/fakes';
import { getNotExpiredGames } from '../../controllers/game';
import { GAMES_AMOUNT } from '../../businessConfig';

const addBotsToGames = async ({ games }) => {
  const gamesNotInProgress = games.filter(o => !o.connectedUserId);
  const botsAmountToCreate = (
    Math.round(GAMES_AMOUNT / 4)
  ) - (games.length - gamesNotInProgress.length);
  if (botsAmountToCreate <= 0) return;

  for (let i = 0; i < botsAmountToCreate; i += 1) {
    const { id: gameId, chanceToWin, risk } = _.sample(gamesNotInProgress);
    const user = _.sample(getBots().filter(o => o.balance >= risk));
    if (!user) return;
    await gameUserConnect({
      user,
      payload: { gameId },
    });
    const result = Math.random() >= chanceToWin / 100;
    setTimeout(() => {
      gameSpin({
        payload: { gameId, result },
        user,
        botMode: true,
      }).catch((e) => {
        console.log(e);
      });
    }, _.random(0, 10000));
  }
};

const addBots = async () => {
  const notExpiredGames = await getNotExpiredGames();
  return addBotsToGames({
    games: notExpiredGames,
  });
};

export default addBots;
