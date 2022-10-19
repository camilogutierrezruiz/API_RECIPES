//* Import dependencies
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

//* Init Users model
const Users = db.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_verified'
  }
});

module.exports = Users;