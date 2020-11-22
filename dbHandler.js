const db = require("./db");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const faker = require("faker");
const bcrypt = require("bcrypt");
require("dotenv").config();

class DbHandler {
  constructor() {
    this.db = db;
  }

  find({ table, body, query, key = null }) {
    if (!key) key = query;
    return this.db[table].find((tab) => tab[query] === body[key]);
  }

  generateJWT(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY);
  }

  createUser(newUser) {
    const id = this.db.users.length;
    let user = _.pick(newUser, [
      "firstName",
      "lastName",
      "email",
      "socialAuth",
      "password"
    ]);
    user.id = id;
    user.socialAuth = user.socialAuth || false;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    console.log(user, id);
    this.db.users.push(user);
    const token = this.generateJWT(user);
    return token;
  }

  async validateUser(guest, user) {
    const validPassword = await bcrypt.compare(guest.password, user.password);
    if (!validPassword) return false;
    return this.generateJWT(user);
  }
}

const dbHandler = new DbHandler();
module.exports = dbHandler;
