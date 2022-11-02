// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../utils/database');

// Import Models for Foreign Key
const Recipes = require('./recipes.models');

// Define Model
const Instructions = db.define('instructions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  step: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
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
module.exports = Instructions;