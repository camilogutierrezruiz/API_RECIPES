const uuid = require('uuid');
const { Op } = require('sequelize');

// Import Models for Joins
const Recipes = require('../../models/recipes.models');
const Users = require('../../models/users.models');
const Categories = require('../../models/categories.models');
const Instructions = require('../../models/instructions.models');
const Ingredients = require('../../models/ingredients.models');
const Types = require('../../models/types.models');

// Import Pivot Tables
const RecipesIngredients = require('../../models/intermediate_tables/recipes_ingredients.models');
const UsersIngredients = require('../../models/intermediate_tables/users_ingrediens.models');


const getAllRecipes = async () => {
  return await Recipes.findAll({
    attributes: ['id', 'title', 'description', 'urlImg', 'time', 'portions', 'origin', 'likes'],
    include: [
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'birthday', 'email', 'phone', 'country', 'gender']
      },
      {
        model: Categories
      },
      {
        model: Instructions,
        attributes: ['step', 'description']
      },
      {
        model: RecipesIngredients,
        attributes: ['id', 'amount'],
        include: {
          model: Ingredients,
          attributes: ['id', 'name', 'urlImg'],
          include: {
            model: Types
          }
        }
      }
    ]
  });
};

const getRecipeById = async (id) => {
  return await Recipes.findOne({
    where: { id },
    attributes: ['id', 'title', 'description', 'urlImg', 'time', 'portions', 'origin', 'likes'],
    include: [
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'birthday', 'email', 'phone', 'country', 'gender']
      },
      {
        model: Categories
      },
      {
        model: Instructions,
        attributes: ['step', 'description']
      },
      {
        model: RecipesIngredients,
        attributes: ['id', 'amount'],
        include: {
          model: Ingredients,
          attributes: ['id', 'name', 'urlImg'],
          include: {
            model: Types
          }
        }
      }
    ]
  });
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

const getMyRecipes = async (userId) => {
  const userIngredients = await UsersIngredients.findAll({
    where: { userId },
    attributes: ['ingredientId']
  });
  const filteredIngredients = userIngredients.map(obj => obj.ingredientId);
  const recipeIngredients = await RecipesIngredients.findAll({
    where: {
      ingredientId: {
        [Op.in]: filteredIngredients
      }
    }
  });
  const filteredRecipes = recipeIngredients.map(obj => obj.recipeId);
  const data = await Recipes.findAll({
    where: {
      id: {
        [Op.in]: filteredRecipes
      }
    }
  });
  return data;
};

// getMyRecipes('8b9db765-60b4-4c4a-8954-888fcaa37536')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
};