const Types = require('../../models/types.models');

const getAllTypes = async () => {
  return await Types.findAll();
};

const getTypeById = async (id) => {
  return await Types.findOne({ where: { id } });
};

const createType = async (name) => {
  return await Types.create(name);
};

const updateType = async (id, newName) => {
  return await Types.update(newName, { where: { id } });
};

const deleteType = async (id) => {
  return await Types.destroy({ where: { id } });
};

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType
};