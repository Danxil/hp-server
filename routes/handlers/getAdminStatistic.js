const getUsersStatistic = async () => {
  const usersOptions = { where: { isAdmin: false } };
  const users = await global.db.User.findAll(usersOptions);
  return {
    users: users.length,
  };
};

const getUsersFileds = ({ source }) => {
  return [
    {
      label: 'Users',
      value: source.users,
    },
  ];
};

export default () => async (req, res) => {
  const realUsersStatistic = await getUsersStatistic({ forBots: false });
  return res.send({
    fields: [
      {
        label: 'Real users statistic',
        fields: getUsersFileds({
          source: realUsersStatistic,
        }),
      },
    ],
  });
};
