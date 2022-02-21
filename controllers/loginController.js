const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { loginSchema } = require('../validations/schemas');
const loginService = require('../services/loginService');

const login = rescue(async (req, res, next) => {
  const user = req.body;
  const { error } = loginSchema.validate(user);
  if (error) return next(error);

  const { email, password } = req.body;
  const infosCheck = await loginService.findInfos(email, password);
  if (infosCheck.error) return next(infosCheck.error);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: infosCheck }, process.env.JWT_SECRET, jwtConfig);
  return res.status(200).json({ token });
});
/*
Controller construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = {
  login,
};
