// Import Test dependecies
const { it, describe } = require('mocha');
const { assert } = require('chai');

//Models
const usersController = require('../src/users/users.controllers');

const add = (a, b) => a + b;

// Todo => Describe
describe('Test add function', () => {

  it('Should return 12 when it pass to func 8 & 4', (done) => {
    const response = add(8, 4);
    assert.equal(response, 12)
    done();
  });

  it('Return 5 when it pass to func 2 & 3 to function', (done) => {
    const response = add(2, 3);
    assert.equal(response, 5);
    done();
  });

});

// Todo => test users controller
describe('Test users controller', () => {
  it('Should return all users', async (done) => {
    try {
      const data = usersController.getAllUsers();
      assert.typeOf(data, 'array');
      done();
    } catch (error) {
      console.log(error);
    }
  });
});