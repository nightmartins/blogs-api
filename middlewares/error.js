const errorMiddleware = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(400)
      .json({ message: err.details[0].message });
  }

  const statusByErrorCode = {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};
/*
Middleware construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = {
  errorMiddleware,
};