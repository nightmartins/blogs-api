const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const { blogPostSchema } = require('../validations/schemas');
const blogPostService = require('../services/blogPostService');

const createPost = rescue(async (req, res, next) => {
  const post = req.body;
  // const { user } = req.user;
  const { error } = blogPostSchema.validate(post);
  if (error) return next(error);

  const createdPost = await blogPostService.createPost(post, req.user);
  if (createdPost.error) return next(createdPost.error);

  return res.status(201).json(createdPost);
});

module.exports = {
  createPost,
};