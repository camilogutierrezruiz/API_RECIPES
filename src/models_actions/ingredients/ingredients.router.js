const router = require('express').Router()
const passport = require('passport')
const adminMiddleware = require('../../middlewares/role.middleware')

const ingredientsServices = require('./ingredients.services')
require('../../middlewares/auth.middleware')(passport)



//? /ingredients 
//? /ingredients/:ingredient_id

router.route('/')
  .get(ingredientsServices.getAllIngredients)
  .post(
    passport.authenticate('jwt', { session: false }),
    adminMiddleware,
    ingredientsServices.postIngredient
  )

router.route('/:ingredient_id')
  .get(ingredientsServices.getIngredientById)
  .patch(
    passport.authenticate('jwt', { session: false }),
    adminMiddleware,
    ingredientsServices.patchIngredient
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    adminMiddleware,
    ingredientsServices.deleteIngredient
  )

router.post(
  '/:ingredient_id/add_to_user',
  passport.authenticate('jwt', { session: false }),
  adminMiddleware,
  ingredientsServices.postIngredientToUser
)
module.exports = router