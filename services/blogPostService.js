const { BlogPost, Category, User } = require('../models');

const createPost = async (newPost, user) => {
  const categories = await Category.findAll({ where: { id: [...newPost.categoryIds] } });

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

const getPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
    ],
});
return allPosts;
};
/*
Referência onde entendi como trazer o retorno correto:
https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

const getPost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };

  return post;
};

const editPost = async (id, user, post) => {
  const oldPost = await BlogPost.findOne({ where: { id } });

  if (oldPost.userId !== user.id) {
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } };
  }

  if (Object.keys(post).includes('categoryIds')) {
    return { error: { code: 'badRequest', message: 'Categories cannot be edited' } };
  }

  await BlogPost.update(post, { where: { id } });

  const editedPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return editedPost;
};

const removePost = async (id, user) => {
  const oldPost = await BlogPost.findOne({ where: { id } });

  if (!oldPost) {
    return { error: { code: 'notFound', message: 'Post does not exist' } };
  }

  if (oldPost.userId !== user.id) {
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } };
  }

  return BlogPost.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  editPost,
  removePost,
};
