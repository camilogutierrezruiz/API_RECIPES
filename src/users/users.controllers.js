//*Import dependencies
const uuid = require('uuid');
const crypto = require('../utils/crypto');

//* Import Model
const Users = require('../models/users.models');

//Todo => Create all functions controllers for Users model
//* Get All Users
const getAllUsers = async () => {
  const data = await Users.findAll();
  return data;
};

//* Get User by ID
const getUserById = async (id) => {
  const data = await Users.findOne({ where: { id } });
  return data;
};

//* Create User
const createUser = async (newUser) => {
  const data = await Users.create({
    id: uuid.v4(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: crypto.hashPassword(newUser.password),
    phone: newUser.phone,
    birthday: newUser.birthday,
    country: newUser.country,
    gender: newUser.gender
  });
  return data;
};

//* Update User
const updateUser = async (id, userToUpdate) => {
  const data = await Users.update(userToUpdate, { where: { id } });
  return data;
};

//* Delete User
const deleteUser = async (id) => {
  const data = await Users.destroy({ where: { id } });
  return data;
};

//* Get User by Email
const getUserByEmail = async (email) => {
  const data = await Users.findOne({ where: { email } });
  return data;
};

//* Export controllers
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};