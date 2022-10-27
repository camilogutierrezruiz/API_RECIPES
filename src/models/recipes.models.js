// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../utils/database');

// Import Models for Foreign Keys
const Users = require('./users.models');
const Categories = require('./categories.models');

// Define Model
const Recipes = db.define('recipes', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlImg: {
    type: DataTypes.STRING,
    field: 'url_img',
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  portions: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category_id',
    references: {
      model: Categories,
      key: 'id'
    }
  },
  origin: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Export Model
module.exports = Recipes;
