const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const { blogPostSchema } = require('../validations/schemas');
const blogPostService = require('../services/blogPostService');

const createPost = rescue(async (req, res, next) => {
  const post = req.body;
  const { error } = blogPostSchema.validate(post);
  if (error) return next(error);

  const createdPost = await blogPostService.createPost(post, req.user);
  if (createdPost.error) return next(createdPost.error);

  return res.status(201).json(createdPost);
});

const getPosts = rescue(async (req, res, _next) => {
  const posts = await blogPostService.getPosts();

  return res.status(200).json(posts);
});

const getPost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await blogPostService.getPost(id);

  if (post.error) return next(post.error);

  return res.status(200).json(post);
});

module.exports = {
  createPost,
  getPosts,
  getPost,
};