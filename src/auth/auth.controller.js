//* Import dependencies
const usersController = require('../users/users.controllers');
const crypto = require('../utils/crypto');

//*  User => receive email && pass

const loginUser = async (email, password) => {
  try {
    const user = await usersController.getUserByEmail(email);
    const verifyPassword = crypto.comparePassword(password, user.password);
    if (verifyPassword) {
      return user;
    };
    return false;
  } catch (err) {
    return false;
  };
};

module.exports = {
  loginUser
};
