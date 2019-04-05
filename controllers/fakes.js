import _ from 'lodash';
import faker from 'faker';
import { Op } from 'sequelize';
import { START_BOT_BALANCE, BOTS_AMOUNT } from '../businessConfig';

let bots = [];

export const generateBot = async () => {
  const user = {
    email: faker.internet.email(),
    accountType: 'investor',
    balance: START_BOT_BALANCE,
    isBot: true,
  };
  faker.locale = 'en';
  user.displayName = `${faker.helpers.contextualCard().username.slice(0, _.random(5, 10))}`;
  return global.db.User.create(user);
};

export const generateBots = async (amount) => {
  const result = await Promise.all(
    Array(amount).fill().map(() => generateBot()),
  );
  return result;
};
export const getRandomBot = () => _.sample(bots);
export const getBots = () => bots;
export const updateBots = async () => {
  let gamesInProgressWithBots;
  if (bots.length) {
    gamesInProgressWithBots = await global.db.Game.findAll({
      where: {
        [Op.or]: [
          {
            connectedUserId: {
              [Op.any]: bots.map(o => o.id),
            },
          },
          {
            creatorUserId: {
              [Op.any]: bots.map(o => o.id),
            },
          },
        ],
      },
    });
  } else {
    gamesInProgressWithBots = [];
  }

  const botsInProgressIds = gamesInProgressWithBots.reduce((prev, o) => prev
    .concat(o.connectedUserId ? [o.connectedUserId] : [])
    .concat(o.creatorUserId ? [o.creatorUserId] : []), []);
  const amountOfDeletedBots = await global.db.User.destroy({
    where: {
      isBot: true,
      id: { [Op.notIn]: botsInProgressIds },
    },
  });

  const botsToCreate = !bots.length ? BOTS_AMOUNT : amountOfDeletedBots;
  const remainedBots = bots.filter(o => botsInProgressIds.indexOf(o.id) !== -1);
  const newBots = await generateBots(botsToCreate);
  bots = [...remainedBots, ...newBots];
};

export const updateFakes = async () => {
  bots = await global.db.User.findAll({ where: { isBot: true } });
  await updateBots();
};
