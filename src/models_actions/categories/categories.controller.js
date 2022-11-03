// Import Model
const Categories = require('../../models/categories.models');

// Define Controllers
// GET all Categories
const getAllCategories = async () => {
  return await Categories.findAll();
};

const getCategoryById = async (id) => {
  return await Categories.findOne({ where: { id } });
};

const createCategory = async (name) => {
  return await Categories.create({ name });
};

const updateCategory = async (id, newName) => {
  return await Categories.update({ name: newName }, { where: { id } });
};

const deleteCategory = async (id) => {
  return await Categories.destroy({ where: { id } })
};

// Export Controllers
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};