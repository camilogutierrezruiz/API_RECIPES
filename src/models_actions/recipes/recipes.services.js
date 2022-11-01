const recipesController = require('./recipes.controller');

const getRecipes = (req, res) => {
  recipesController.getAllRecipes()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

const getOneRecipe = (req, res) => {
  const id = req.params.recipe_id;
  recipesController.getRecipeById(id)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

const postRecipe = (req, res) => {
  const userId = userId.user.id;
  const newRecipe = {
    title: req.body.title,
    description: req.body.description,
    urlImg: req.body.urlImg,
    time: req.body.time,
    portions: req.body.portions,
    userId,
    categoryId: req.body.categoryId,
    origin: req.body.origin,
    likes: req.body.likes
  };
  if (title && description && time && portions && userId && categoryId) {
    recipesController.createRecipe(newRecipe)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'Missing Data',
      fields: {
        title: 'string',
        description: 'string',
        time: 'number',
        portions: 'number',
        categoryId: 'number'
      }
    });
  }
};

const patchRecipe = (req, res) => {
  const id = req.params.recipe_id;
  const recipeToUpdate = {
    title: req.body.title,
    description: req.body.description,
    urlImg: req.body.urlImg,
    time: req.body.time,
    portions: req.body.portions,
    categoryId: req.body.categoryId,
    origin: req.body.origin
  }
  recipesController.createRecipe(id, recipeToUpdate)
    .then(data => {
      data[0]
        ? res.status(200).json({ message: `Recipe ${id} has been updated succesfully!` })
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
};

const deleteRecipe = (req, res) => {
  const id = req.params.recipe_id;
  recipesController.deleteRecipe(id)
    .then(data => {
      data
        ? res.status(204).json()
        : res.status(404).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
};

module.exports = {
  getRecipes,
  getOneRecipe,
  postRecipe,
  patchRecipe,
  deleteRecipe
};