const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const { categorieSchema } = require('../validations/schemas');
const categorieService = require('../services/categorieService');

const createCategorie = rescue(async (req, res, next) => {
  const categorie = req.body;
  const { error } = categorieSchema.validate(categorie);
  if (error) return next(error);

  const createdCategorie = await categorieService.createCategorie(categorie);
  if (createdCategorie.error) return next(createdCategorie.error);

  // const jwtConfig = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };
  // const token = jwt.sign({ data: createdCategorie }, process.env.JWT_SECRET, jwtConfig);
  return res.status(201).json(createdCategorie);
});

const getCategories = rescue(async (req, res, _next) => { 
  const categories = await categorieService.getCategories();
  return res.status(200).json(categories);
});

module.exports = {
  createCategorie,
  getCategories,
};
