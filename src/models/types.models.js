// Import dependencies
const { DataTypes } = require('sequelize');

// Import Database
const db = require('../utils/database');

// Define Model
const Types = db.define('types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

// Export Model
module.exports = Types;