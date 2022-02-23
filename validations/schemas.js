const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginSchema,
  categorySchema,
  blogPostSchema,
};

/*
1. Referências de utilização do Joi:
  1.1- https://www.luiztools.com.br/post/tutorial-de-validacao-de-input-de-dados-em-node-js/#:~:text=O%20Joi%20usa%20uma%20linguagem,no%20in%C3%ADcio%20do%20seu%20index.
  1.2 https://joi.dev/api/?v=17.6.0#stringemailoptions 
*/