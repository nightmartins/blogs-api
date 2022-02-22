const { BlogPost, Categorie } = require('../models');

const createPost = async (newPost, user) => {
  const categories = await Categorie.findAll({ where: { id: [...newPost.categoryIds] } });

  if (categories.length !== newPost.categoryIds.length) {
    return { error: { code: 'badRequest', message: '"categoryIds" not found' } };
  }
  const postObj = {
    ...newPost,
    userId: user.id,
  };

  const createdPost = await BlogPost.create(postObj);

  const postResponse = await BlogPost.findOne({
    where: { id: createdPost.id },
    attributes: { exclude: ['published', 'updated'] },
  });

  return postResponse;
};
/*
Service construído com a ajuda do aluno Rodolfo Braga.
Referência: https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = {
  createPost,
};
