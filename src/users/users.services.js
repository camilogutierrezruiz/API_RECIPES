//* Import Controllers from users.controllers
const { json } = require('sequelize');
const usersController = require('./users.controllers');

//Todo => Create services 
//* Get All Users
const getUsers = (req, res) => {
  usersController.getAllUsers()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

//* Get One User
const getOneUser = (req, res) => {
  const id = req.params.id;
  usersController.getUserById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).json({ message: err.message });
    });
};

//* Post => Register User
const registerUser = (req, res) => {
  const { firstName, lastName, birthday, email, password, phone, country, gender } = req.body;
  if (firstName && lastName && birthday && email && password && phone) {
    usersController.createUser({ firstName, lastName, birthday, email, password, phone, country, gender })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      });
  } else {
    res.status(400).json({
      message: 'All fiedls must be completed',
      fields: {
        firstName: 'string',
        lastName: 'string',
        email: 'string@email.com',
        password: 'string',
        phone: '+571234567890',
        birthday: 'YYYY-MM-DD'
      }
    });
  };
};

//* Patch/Put One User
const patchUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, country, gender } = req.body;
  usersController.updateUser(id, { firstName, lastName, phone, country, gender })
    .then(data => {
      data[0]
        ? res.status(200).json({ message: `User with id ${id} updated succesfully` })
        : res.status(400).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    });
};

//* Delete User
const deleteUser = (req, res) => {
  const id = req.params.id;
  usersController.deleteUser(id)
    .then(data => {
      data
        ? res.status(204).json({})
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    });
};

module.exports = {
  getUsers,
  getOneUser,
  registerUser,
  patchUser,
  deleteUser
};