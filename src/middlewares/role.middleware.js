
const adminValidate = (req, res, next) => {
  const role = req.user.role;
  role === 'admin'
    ? next()
    : res.status(401).json({ message: 'Access Denied!' });
};

module.exports = adminValidate;