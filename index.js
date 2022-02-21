const express = require('express');
const bodyParser = require('body-parser');

const { createUser, getUser, getUsers } = require('./controllers/userController');
const { login } = require('./controllers/loginController');
const { createCategorie } = require('./controllers/categorieController');
const { errorMiddleware } = require('./middlewares/error');
const { authJWT } = require('./validations/authJWT');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', createUser);

app.post('/login', login);

app.post('/categories', authJWT, createCategorie);

app.get('/user/:id', authJWT, getUser);
app.get('/user', authJWT, getUsers);

app.use(errorMiddleware);
