// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../../utils/database');

// Import Model for Foreign Key
const Users = require('../users.models');
const Recipes = require('../recipes.models');

// Define Model
const UsersRecipes = db.define('users_recipes', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: Users,
      key: 'id'
    }
  },
  recipeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'recipe_id',
    references: {
      model: Recipes,
      key: 'id'
    }
  }
});

// Export Model
module.exports = UsersRecipes;