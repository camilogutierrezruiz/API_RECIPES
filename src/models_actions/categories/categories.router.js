const router = require('express').Router();

const categoriesServices = require('./categories.services');

router.route('/')
  .get(categoriesServices.getCategories)
  .post(categoriesServices.postCategory);

router.route('/:category_id')
  .get(categoriesServices.getOneCategory)
  .patch(categoriesServices.patchCategory)
  .delete(categoriesServices.deleteCategory);

module.exports = router;