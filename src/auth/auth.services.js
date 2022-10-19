const jwt = require('jsonwebtoken');
const authController = require('./auth.controller');
const { jwtSecret } = require('../config');

const login = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    authController.loginUser(email, password)
      .then(response => {
        if (response) {
          const token = jwt.sign({
            id: response.id,
            email: response.email,
            role: response.role
          }, jwtSecret);
          res.status(200).json({
            message: 'Credentials OK',
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credenctials' });
        }
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
  } else {
    res.status(400).json({ message: 'Missing data' });
  };
};

module.exports = {
  login
};