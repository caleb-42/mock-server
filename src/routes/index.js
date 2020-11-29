const auth = require("./auth");
const profile = require("./profile");
const forgotPass = require("./forgotPass");

module.exports = function Routes(server) {
  auth(server);
  profile(server);
  forgotPass(server);
};
