import businessConfig from '../../businessConfig';

export default () => async (req, res) => {
  return res.send(businessConfig);
};
