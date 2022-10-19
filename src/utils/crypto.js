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

//* Examples
// console.log(hashPassword('root')); Result => $2b$10$kGYr0udcHp5r94fQKKuQiegleuMIKBWfVsVk0wk7g.QMjrNFH/sGy

// console.log(comparePassword('root', '$2b$10$kGYr0udcHp5r94fQKKuQiegleuMIKBWfVsVk0wk7g.QMjrNFH/sGy'));