//* Dependencies
const express = require('express');
const cors = require('cors');
const db = require('./utils/database');

//* Files
const { port } = require('./config');
const initModels = require('./models/initModels');
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const categoriesRouter = require('./models_actions/categories/categories.router');
const typesRouter = require('./models_actions/types/types.router');
const recipesRouter = require('./models_actions/recipes/recipes.router');
const ingredientsRouter = require('./models_actions/ingredients/ingredients.router');

//* Initial Configs
const app = express();
app.use(express.json());
app.use(cors());

//* Database setting
//todo => Authentication
db.authenticate()
  .then(() => {
    console.log('Database authenticated');
  })
  .catch((err) => {
    console.log(err);
  });

//todo => Synchronization
db.sync({
  // force: true
})
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.log(err);
  });

//* Init Models
initModels();

//* Define API prefix
const URL_API = '/api/v1';

app.get(`${URL_API}`, (req, res) => {
  res.status(200).json({
    message: 'RECIPES API OK!'
  });
});

app.use(`${URL_API}/users`, userRouter);
app.use(`${URL_API}/auth`, authRouter);
app.use(`${URL_API}/categories`, categoriesRouter);
app.use(`${URL_API}/types`, typesRouter);
app.use(`${URL_API}/recipes`, recipesRouter);
app.use(`${URL_API}/ingredients`, ingredientsRouter);

app.listen(port, () => {
  console.log(`Server started ar port ${port}`);
});