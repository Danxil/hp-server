import { createTicket } from '../../controllers/support';

export default () => async (req, res) => {
  try {
    const { subject, text, email } = req.body;

    const ticket = await createTicket({
      subject,
      text,
      email,
    });
    res.status(200).send(ticket.toJSON());
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
