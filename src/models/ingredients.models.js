// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../utils/database');

// Import Model for Foreign Key
const Types = require('./types.models');

// Define Model
const Ingredients = db.define('ingredients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_id',
    references: {
      model: Types,
      key: 'id'
    }
  },
  urlImg: {
    type: DataTypes.STRING,
    field: 'url_img',
    validate: {
      isUrl: true
    }
  }
}, {
  timestamps: false
});

// Export Model
module.exports = Ingredients;