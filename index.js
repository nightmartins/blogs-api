const express = require('express');
const bodyParser = require('body-parser');

const { createUser, getUser, getUsers } = require('./controllers/userController');
const { login } = require('./controllers/loginController');
const { createCategory, getCategories } = require('./controllers/categoryController');
const { createPost, getPosts, getPost, editPost } = require('./controllers/blogPostController');
const { errorMiddleware } = require('./middlewares/error');
const { authJWT } = require('./validations/authJWT');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// user
app.post('/user', createUser);
app.get('/user/:id', authJWT, getUser);
app.get('/user', authJWT, getUsers);

// login
app.post('/login', login);

// categories
app.post('/categories', authJWT, createCategory);
app.get('/categories', authJWT, getCategories);

// post
app.put('/post/:id', authJWT, editPost);
app.post('/post', authJWT, createPost);
app.get('/post/:id', authJWT, getPost);
app.get('/post', authJWT, getPosts);

app.use(errorMiddleware);
