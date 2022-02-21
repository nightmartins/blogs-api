const { Categorie } = require('../models');

const createCategorie = async (newCategorie) => {
  // const findCategorie = await Categorie.findOne({ where: { name: newCategorie.name } });
  // console.log(newCategorie);
  // if (findCategorie) {
  //   return { error: { code: 'conflict', message: 'Categorie already registered' } };
  // }
  const createdCategorie = await Categorie.create(newCategorie);
  console.log(createdCategorie.dataValues);
  return createdCategorie.dataValues;
};

const getCategories = async () => {
  const allCategories = await Categorie.findAll();
  return allCategories;
};

// const getCategorie = async (id) => {
//   const categorie = await Categorie.findByPk(id);
//   if (!categorie) return { error: { code: 'notFound', message: 'Categorie does not exist' } };
//   return categorie;
// };

module.exports = {
  createCategorie,
  getCategories,
  // getCategorie,
};
