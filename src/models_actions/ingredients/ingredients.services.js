const ingredientsControllers = require('./ingredients.controller')

const getAllIngredients = (req, res) => {
  ingredientsControllers.getAllIngredients()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const getIngredientById = (req, res) => {
  const id = req.params.ingredient_id
  ingredientsControllers.getIngredientById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postIngredient = (req, res) => {
  const { name, typeId, urlImg } = req.body

  if (name && typeId) {
    ingredientsControllers.createIngredient({
      name, typeId, urlImg
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({
      message: 'Missing Data',
      fields: {
        name: 'string',
        typeId: 'number',
        urlImg: 'string'
      }
    })
  }
}


const patchIngredient = (req, res) => {
  const { name, typeId, urlImg } = req.body
  const id = req.params.ingredient_id
  ingredientsControllers.updateIngredient(id, { name, typeId, urlImg })
    .then(data => {
      if (data[0]) {
        res.status(200).json({ message: `Ingredient with ID: ${id} edited succesfully` })
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const deleteIngredient = (req, res) => {
  const id = req.params.ingredient_id

  ingredientsControllers.deleteIngredient(id)
    .then(data => {
      if (data) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: 'Invalid ID', id })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postIngredientToUser = (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  const ingredientId = req.params.ingredient_id;
  if (amount) {
    ingredientsControllers.addIngredientToUser({ userId, amount, ingredientId })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'Missing Data. Filed Required',
      fields: {
        amount: 'STRING'
      }
    });
  }
};


module.exports = {
  getAllIngredients,
  getIngredientById,
  postIngredient,
  patchIngredient,
  deleteIngredient,
  postIngredientToUser
}


