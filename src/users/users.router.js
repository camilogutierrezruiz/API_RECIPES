//* Define router from express
const router = require('express').Router();
const passport = require('passport');

//* Import User Services
const usersServices = require('./users.services');

//* Middleware protected route
require('../middlewares/auth.middleware')(passport);

//Todo => Configure routes
//* Root Route
router.get('/', passport.authenticate('jwt', { session: false }), usersServices.getUsers);

//* Route Info logged user
router.route('/me')
  .get()
  .patch()
  .delete();

//* Dynamic Routes by Id /users/:id
router.route('/:id')
  .get(usersServices.getOneUser)
  .patch(usersServices.patchUser)
  .delete(usersServices.deleteUser);

module.exports = router;