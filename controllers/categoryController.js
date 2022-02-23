const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const { categorySchema } = require('../validations/schemas');
const categoryService = require('../services/categoryService');

const createCategory = rescue(async (req, res, next) => {
  const category = req.body;
  const { error } = categorySchema.validate(category);
  if (error) return next(error);

  const createdCategory = await categoryService.createCategory(category);
  if (createdCategory.error) return next(createdCategory.error);

  // const jwtConfig = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };
  // const token = jwt.sign({ data: createdCategory }, process.env.JWT_SECRET, jwtConfig);
  return res.status(201).json(createdCategory);
});

const getCategories = rescue(async (req, res, _next) => { 
  const categories = await categoryService.getCategories();
  return res.status(200).json(categories);
});

module.exports = {
  createCategory,
  getCategories,
};
