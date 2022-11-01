//* Import Bcrypt
const bcrypt = require('bcrypt');

//* Encrypt string password
const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, 10);

//* Compare if password login credentials == hashed password database
const comparePassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword
};