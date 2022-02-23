const { Category } = require('../models');

const createCategory = async (newCategory) => {
  // const findCategorie = await Categorie.findOne({ where: { name: newCategorie.name } });
  // console.log(newCategorie);
  // if (findCategorie) {
  //   return { error: { code: 'conflict', message: 'Categorie already registered' } };
  // }
  const createdCategory = await Category.create(newCategory);
  console.log(createdCategory.dataValues);
  return createdCategory.dataValues;
};

const getCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

// const getCategorie = async (id) => {
//   const categorie = await Categorie.findByPk(id);
//   if (!categorie) return { error: { code: 'notFound', message: 'Categorie does not exist' } };
//   return categorie;
// };

module.exports = {
  createCategory,
  getCategories,
  // getCategorie,
};
