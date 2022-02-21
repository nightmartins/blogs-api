const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// const { authJWT } = require('../validations/authJWT');


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

module.exports = {
  createUser,
  getUsers,
};
