const router = require('express').Router();
const passport = require('passport');
const recipesServices = require('./recipes.services');
require('../../middlewares/auth.middleware')(passport);

router.route('/')
  .get(recipesServices.getRecipes)
  .post(
    passport.authenticate('jwt', { session: false }),
    recipesServices.postRecipe
  );

router.route('/:recipe_id')
  .get(
    passport.authenticate('jwt', { session: false }),
    recipesServices.getOneRecipe
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    recipesServices.patchRecipe
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    recipesServices.deleteRecipe
  );

module.exports = router;