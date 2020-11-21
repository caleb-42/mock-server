const DbHandler = require("../../dbHandler.js");

module.exports = function auth(server) {
  server.post("/auth/register", async (req, res, next) => {
    console.log(req.body);
    const person = req.body;
    if (!person) return res.jsonp({ message: "invalid request data" });
    const userExist = DbHandler.find({
      table: "users",
      body: person,
      query: "email"
    });
    if (userExist)
      return res.jsonp({ status: "error", data: "user already exist" });
    const token = await DbHandler.createUser(person);
    res.jsonp({
      token,
      status: "success"
    });
  });
};
