import _ from 'lodash';
import { AES } from 'crypto-js';
import moment from 'moment';
import {
  GAME_USER_TIMEOUT,
  GAMES_AMOUNT,
  GAME_EXPIRE_DELLAY,
  FAKE_GAME_MIN_BET,
  FAKE_GAME_MAX_BET,
} from '../businessConfig';
import { getRandomBot } from './fakes';

const debug = require('debug')('game');

export const findGame = async ({ gameId }) => {
  return global.db.Game.find({
    where: { id: gameId },
    include: [
      { model: global.db.User, as: 'creatorUser' },
      { model: global.db.User, as: 'connectedUser' },
    ],
  });
};
export const getNotExpiredGames = async () => {
  return global.db.Game.findAll({
    include: [
      { model: global.db.User, as: 'creatorUser' },
      { model: global.db.User, as: 'connectedUser' },
    ],
  });
};
export const convertGameToJson = (game) => {
  return _.omit({
    ...game.toJSON(),
    connectedUser: game.connectedUser ? game.connectedUser.toJSON() : null,
    creatorUser: game.creatorUser ? game.creatorUser.toJSON() : null,
    schema: AES.encrypt(game.schema, 'dAfg$1397642gsge_39').toString(),
  }, []);
};
export const checkAndDisconnectConnectedGameUser = async ({ game }) => {
  if (!game.lastTouchAt || game.spinInProgress) return null;
  const expireTime = moment(game.lastTouchAt).add(GAME_USER_TIMEOUT).format();
  const now = moment(new Date()).format();
  if (expireTime > now) return null;
  debug(`Game user disconnected. gamedId: ${game.id}, userId: ${game.connectedUserId}`);
  const { connectedUserId, id: gameId } = game;
  await game.update({ lastTouchAt: null, connectedUserId: null });
  const obj = {
    gameId,
    userId: connectedUserId,
  };
  return obj;
};

export const expireGame = async ({ game }) => {
  debug(`Game expired. gameId: ${game.id}`);
  await game.destroy({ force: true });
  if (!game.creatorUserId) return null;
  const updatedCreatorUser = await game.creatorUser.update({
    balance: game.creatorUser.balance + (game.bet * 2),
  });
  return { updatedCreatorUser, createdGame: null };
};

export const checkAndExpireNotExpiredGame = async ({ game }) => {
  if (game.spinInProgress) return {};
  if (
    moment(game.updatedAt).add(GAME_EXPIRE_DELLAY, 'ms').format() <= moment().format()
  ) {
    const userToUpdate = await expireGame({ game });
    return { expiredGame: game, userToUpdate };
  }
  return {};
};

export const checkAndDisconnectConnectedGameUsers = async () => {
  const notExpiredGames = await getNotExpiredGames();
  const result = await Promise.all(
    notExpiredGames.map(game => checkAndDisconnectConnectedGameUser({ game })),
  );
  const gameUsersDisconnected = result.filter(o => o);
  return {
    gameUsersDisconnected,
  };
};

export const createGame = async ({ defaults = {} } = {}) => {
  const game = await global.db.Game.create(defaults);
  if (game.creatorUserId) {
    game.creatorUser = await game.getCreatorUser();
  }
  debug(`Game created. gameId: ${game.id}`);
  return game;
};

export const addGames = ({ games }) => {
  const gamesToCreateAmount = GAMES_AMOUNT - games.length;
  const gamesToCreateArr = new Array(gamesToCreateAmount >= 0 ? gamesToCreateAmount : 0).fill();
  return Promise.all(
    gamesToCreateArr.map(() => createGame({
      defaults: {
        bet: _.random(FAKE_GAME_MIN_BET, FAKE_GAME_MAX_BET),
        creatorUserId: getRandomBot().id,
      },
    })),
  );
};

export const checkAndExpireNotExpiredGames = async () => {
  const notExpiredGames = await getNotExpiredGames();

  const results = await Promise.all(
    notExpiredGames.map(game => checkAndExpireNotExpiredGame({ game })),
  );

  const expiredGames = results.filter(o => o.expiredGame);
  const notifyUsersCreatorsIdsAboutGameExpired = expiredGames
  .map(o => o.expiredGame.creatorUserId)
  .filter(o => o);
  const expiredGamesIds = expiredGames.map(o => o.expiredGame.id);

  const usersToUpdate = results
  .filter(o => o.userToUpdate)
  .map(o => o.userToUpdate);

  const newNotExpiredGames = notExpiredGames
  .filter(notExpiredGame => !expiredGamesIds.find(id => notExpiredGame.id === id));
  const createdGames = await addGames({
    games: newNotExpiredGames,
  });

  return {
    expiredGamesIds,
    notifyUsersCreatorsIdsAboutGameExpired,
    createdGames,
    usersToUpdate,
  };
};

export const getGame = async ({ game, gameId }) => {
  let targetGame;
  if (!game) targetGame = await global.db.Game.find({ where: { id: gameId } });
  else targetGame = game;
  return targetGame;
};

export const checkBeforeGameAction = async ({ user, gameId, game: gameToUse }) => {
  const game = await getGame({ gameId, game: gameToUse });
  if (!game) return false;
  if (game.bet > user.balance) {
    debug(`Game action impossible. Low balance. gameId: ${game.id}, userId: ${user.id}`);
    return false;
  }
  if (game.spinInProgress) {
    debug(`Game action impossible. Game spin already in progress. gameId ${game.id}, userId: ${user.id}`);
    return false;
  }
  return true;
};

export const getInitData = async () => {
  const games = await getNotExpiredGames();
  return { games };
};
