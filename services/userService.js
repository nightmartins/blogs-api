const { User } = require('../models');

const createUser = async (newUser) => {
  const findUser = await User.findOne({ where: { email: newUser.email } });
  if (findUser) return { error: { code: 'conflict', message: 'User already registered' } };

  const createdUser = await User.create(newUser);
  return createdUser.dataValues;
};
/*
Service construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

const getUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

module.exports = {
  createUser,
  getUsers,
};
