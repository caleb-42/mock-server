const auth = require("./auth");
const profile = require("./profile");

module.exports = function Routes(server) {
  auth(server);
  profile(server);
};
