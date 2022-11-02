const router = require('express').Router();
const typesServices = require('./types.services');

router.route('/')
  .get(typesServices.getTypes)
  .post(typesServices.postType);

router.route('/:type_id')
  .get(typesServices.getOneType)
  .patch(typesServices.patchType)
  .delete(typesServices.deleteType);

module.exports = router;