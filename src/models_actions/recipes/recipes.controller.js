const uuid = require('uuid');
const Recipes = require('../../models/recipes.models');

const getAllRecipes = async () => {
  return await Recipes.findAll();
};

const getRecipeById = async (id) => {
  return await Recipes.findOne({ where: { id } });
};

const createRecipe = async (newRecipe) => {
  return await Recipes.create({
    id: uuid.v4(),
    title: newRecipe.title,
    description: newRecipe.description,
    urlImg: newRecipe.urlImg,
    time: newRecipe.time,
    portions: newRecipe.portions,
    userId: newRecipe.userId,
    categoryId: newRecipe.categoryId,
    origin: newRecipe.origin,
    likes: newRecipe.likes
  });
};

const updateRecipe = async (id, recipeToUpdate) => {
  return await Recipes.update(recipeToUpdate, { where: { id } });
};

const deleteRecipe = async (id) => {
  return await Recipes.destroy({ where: { id } });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};