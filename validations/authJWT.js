const jwt = require('jsonwebtoken');

const { User } = require('../models');

const authJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.data.email } });

    if (!user) {
      return res.status(401).json({ message: 'Token user not found' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
/*
Middleware construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = {
  authJWT,
};