const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  decodeToken: (token) => jwt.verify(token, process.env.JWT_PRIVATE_KEY)
};
