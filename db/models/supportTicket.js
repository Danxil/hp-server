import Sequelize from 'sequelize';

export default (sequelize) => {
  const SupportTicket = sequelize.define('SupportTicket', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, {
    name: {
      singular: 'supportTicket',
      plural: 'supportTickets',
    },
  });

  SupportTicket.associate = () => {
  };

  return SupportTicket;
};
