//* Define router from express
const router = require('express').Router();
const passport = require('passport');

//* Import User Services
const usersServices = require('./users.services');
const recipesServices = require('../models_actions/recipes/recipes.services');

//* Middleware protected route
require('../middlewares/auth.middleware')(passport);

//Todo => Configure routes
//* Root Route
router.route('/')
  .get(usersServices.getUsers);

//* Route Info logged user
router.route('/me')
  .get(
    passport.authenticate('jwt', { session: false }),
    usersServices.getMyUser
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    usersServices.patchMyUser
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    usersServices.deleteMyUser
  );

//* Dynamic Routes by Id /users/:id
router.route('/:id')
  .get(usersServices.getOneUser)
  .patch(usersServices.patchUser)
  .delete(usersServices.deleteUser);

// Get My recipes
router.get(
  '/me/my_recipes',
  passport.authenticate('jwt', { session: false }),
  recipesServices.getUserRecipes
);

module.exports = router;