const typesController = require('./types.controller');

const getTypes = (req, res) => {
  typesController.getAllTypes()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

const getOneType = (req, res) => {
  const id = req.params.type_id;
  typesController.getTypeById(id)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    });
};

const postType = (req, res) => {
  const { name } = req.body;
  if (name) {
    typesController.createType(name)
      .then(data => {
        res.status(201).json({ message: 'Type was created', data })
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      });
  } else {
    res.status(400).json({
      message: 'Missing Data. Fields Required',
      fields: {
        name: 'STRING'
      }
    });
  };
};

const patchType = (req, res) => {
  const id = req.params.type_id;
  const { name } = req.body;
  typesController.updateType(id, name)
    .then(data => {
      data[0]
        ? res.status(200).json({ message: `Type ${id} has been updated!` })
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

const deleteType = (req, res) => {
  const id = req.params.type_id;
  typesController.deleteType(id)
    .then(data => {
      data
        ? res.status(204).json()
        : res.status(404).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getTypes,
  getOneType,
  postType,
  patchType,
  deleteType
};