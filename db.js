const faker = require("faker");
const bcrypt = require("bcrypt");
const _ = require("lodash");

let obj = {};

function generateUsers() {
  obj.users = [];
  for (let i = 0; i < 10; i++) {
    let id = faker.random.uuid();
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    const salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync("12345", salt);
    let socialAuth = false;

    obj.users.push({
      id,
      firstName,
      lastName,
      email,
      password,
      socialAuth
    });
  }
}

function createDatabase() {
  if (!_.isEmpty(obj)) return obj;
  generateUsers();
  return obj;
}

module.exports = createDatabase();
