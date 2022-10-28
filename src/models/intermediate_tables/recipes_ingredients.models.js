// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../../utils/database');

// Import Model for Foreign Key
const Recipes = require('../recipes.models');
const Ingredients = require('../ingredients.models');

// Define Model
const RecipesIngredients = db.define('recipes_ingredients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recipeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'recipe_id',
    reference: {
      model: Recipes,
      key: 'id'
    }
  },
  ingredientId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'ingredient_id',
    reference: {
      model: Ingredients,
      key: 'id'
    }
  }
});

// Export Model
module.exports = RecipesIngredients;