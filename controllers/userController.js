const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../validations/schemas');
const userService = require('../services/userService');

const createUser = rescue(async (req, res, next) => {
  const user = req.body;
  const { error } = userSchema.validate(user);
  if (error) return next(error);

  const createdUser = await userService.createUser(user);
  if (createdUser.error) return next(createdUser.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: createdUser }, process.env.JWT_SECRET, jwtConfig);
  return res.status(201).json({ token });
});
/*
Controller construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

const getUsers = rescue(async (req, res, _next) => { 
  const users = await userService.getUsers();
  return res.status(200).json(users);
});

const getUser = rescue(async (req, res, next) => {
  const { id } = req.params; 
  const user = await userService.getUser(id);
  if (user.error) return next(user.error);
  return res.status(200).json(user);
});

const removeUser = rescue(async (req, res, _next) => {
  const user = req.user.id;
  await userService.removeUser(user);
  return res.status(204).end();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  removeUser,
};
