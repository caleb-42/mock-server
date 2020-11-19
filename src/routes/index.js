const auth = require("./auth");

module.exports = function Routes(server) {
  auth(server);
};
