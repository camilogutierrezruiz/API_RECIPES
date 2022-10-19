const router = require('express').Router();
const usersServices = require('../users/users.services');
const authServices = require('./auth.services');

router.post('/register', usersServices.registerUser);

router.post('/login', authServices.login);

module.exports = router;