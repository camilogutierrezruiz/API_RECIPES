// Import Models 
const Users = require('./users.models');
const Recipes = require('./recipes.models');
const Ingredients = require('./ingredients.models');
const Instructions = require('./instructions.models');
const Categories = require('./categories.models');
const Types = require('./types.models');

// Import Intermediate Tables
const RecipesIngredients = require('./intermediate_tables/recipes_ingredients.models');
const UsersIngredients = require('./intermediate_tables/users_ingrediens.models');
const UsersRecipes = require('./intermediate_tables/users_recipes.models');

// Models Associations
const initModels = () => {

  // Users - Recipes => 1 : N
  Users.hasMany(Recipes);
  Recipes.belongsTo(Users);

  // User - Recipes => N : N Pivot Table => (UsersRecipes)
  Users.hasMany(UsersRecipes);
  UsersRecipes.belongsTo(Users);
  Recipes.hasMany(UsersRecipes);
  UsersRecipes.belongsTo(Recipes);

  // User - Ingredients => N : N Pivot Table => (UsersIngredients)
  Users.hasMany(UsersIngredients);
  UsersIngredients.belongsTo(Users);
  Ingredients.hasMany(UsersIngredients);
  UsersIngredients.belongsTo(Ingredients);

  // Recipes - Ingredients => N : N Pivot Table => (RecipesIngredients)
  Recipes.hasMany(RecipesIngredients);
  RecipesIngredients.belongsTo(Recipes);
  Ingredients.hasMany(RecipesIngredients);
  RecipesIngredients.belongsTo(Ingredients);

  // Recipes - Instructions => 1 : N
  Recipes.hasMany(Instructions);
  Instructions.belongsTo(Recipes);

  // Categories - Recipes => 1 : N
  Categories.hasMany(Recipes);
  Recipes.belongsTo(Categories);

  // Types - Ingredients => 1 : N
  Types.hasMany(Ingredients);
  Ingredients.belongsTo(Types);

};

// Export Init Models
module.exports = initModels;