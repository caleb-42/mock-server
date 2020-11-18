const faker = require("faker");

const obj = {
  users: []
};

function generateUsers() {
  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let socialAuth = false;

    obj.users.push({
      firstName,
      lastName,
      email,
      password,
      socialAuth
    });
  }
  return obj;
}

module.exports = generateUsers;
