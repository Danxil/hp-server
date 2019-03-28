export const createTicket = async ({ subject, text, email }) => {
  const supportTicket = await global.db.SupportTicket.create({ subject, text, email });
  return supportTicket;
};
