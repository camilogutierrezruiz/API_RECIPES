const categoriesController = require('./categories.controller');

const getCategories = (req, res) => {
  categoriesController.getAllCategories()
    .then(data => {
      res
        .status(200)
        .json(data);
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: err.message });
    });
};

const getOneCategory = (req, res) => {
  const id = req.params.category_id;
  categoriesController.getCategoryById(id)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: err.message });
    });
};

const postCategory = (req, res) => {
  const { name } = req.body;
  if (name) {
    categoriesController.createCategory(name)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
  } else {
    res.status(400).json({
      message: 'Invalid Data',
      fiels: {
        name: 'STRING'
      }
    });
  }
};

const patchCategory = (req, res) => {
  const id = req.params.category_id;
  const { name } = req.body;
  categoriesController.updateCategory(id, name)
    .then(data => {
      data[0]
        ? res.status(200).json(`Category ${id} has been updated!`)
        : res.status(404).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    });
};

const deleteCategory = (req, res) => {
  const id = req.params.category_id;
  categoriesController.deleteCategory(id)
    .then(data => {
      data
        ? res.status(204).json()
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getCategories,
  getOneCategory,
  postCategory,
  patchCategory,
  deleteCategory
};