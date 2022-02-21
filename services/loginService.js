const { User } = require('../models');

const findInfos = async (email, password) => {
  const findUser = await User.findOne({ where: { email, password }, raw: true });
  if (!findUser) return { error: { code: 'badRequest', message: 'Invalid fields' } };

  return findUser;
};
/*
Service construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = {
  findInfos,
};
