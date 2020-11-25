const DbHandler = require("../../dbHandler.js");

module.exports = function auth(server) {
  server.post("/auth/register", async (req, res, next) => {
    console.log(req.body);
    try {
      const person = req.body;
      if (
        !(
          person &&
          person.firstName &&
          person.lastName &&
          person.password &&
          person.email
        )
      )
        return res.jsonp({ status: "error", message: "invalid request data" });
      const userExist = DbHandler.find({
        table: "users",
        body: person,
        query: "email"
      });
      if (userExist)
        return res.jsonp({ status: "error", message: "user already exist" });
      const token = await DbHandler.createUser(person);
      res.jsonp({
        data: token,
        status: "success"
      });
    } catch (e) {
      res.jsonp({ status: "error", message: "something went wrong" });
    }
  });

  server.post("/auth/login", async (req, res, next) => {
    console.log(req.body);
    try {
      const person = req.body;
      if (!(person && person.password && person.email))
        return res.jsonp({ status: "error", message: "invalid request data" });
      const userExist = DbHandler.find({
        table: "users",
        body: person,
        query: "email"
      });
      if (!userExist)
        return res.jsonp({ status: "error", message: "user does not exist" });

      const token = await DbHandler.validateUser(person, userExist);
      if (!token)
        return res.jsonp({
          status: "error",
          message: "email or password is invalid"
        });

      res.jsonp({
        data: token,
        status: "success"
      });
    } catch (e) {
      res.jsonp({ status: "error", message: "something went wrong" });
    }
  });
};
