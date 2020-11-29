const DbHandler = require("../../dbHandler.js");

module.exports = function auth(server) {
  server.post("/forgot-pass", async (req, res, next) => {
    console.log(req.body);
    try {
      const person = req.body;
      if (!(person && person.email))
        return res.jsonp({ status: "error", message: "invalid request data" });
      const userExist = DbHandler.find({
        table: "users",
        body: person,
        query: "email"
      });

      if (!userExist)
        return res.jsonp({ status: "error", message: "user does not exist" });
      const newUser = DbHandler.updateUser({
        ...userExist,
        ...person,
        token: 1234
      });
      if (newUser) {
        return res.jsonp({
          data: newUser,
          status: "success"
        });
      } else throw Error("could not send reset token");
    } catch (e) {
      res.jsonp({ status: "error", message: "something went wrong" });
    }
  });

  server.post("/forgot-pass/confirm-token", async (req, res, next) => {
    console.log(req.body);
    try {
      const person = req.body;
      if (!(person && person.email && person.token))
        return res.jsonp({ status: "error", message: "invalid request data" });

      const userExist = DbHandler.find({
        table: "users",
        body: person,
        query: "email"
      });

      if (!userExist)
        return res.jsonp({ status: "error", message: "user does not exist" });

      if (userExist.token !== person.token)
        return res.jsonp({
          status: "error",
          message: "reset token is invalid"
        });

      return res.jsonp({
        data: userExist,
        status: "success"
      });
    } catch (e) {
      res.jsonp({ status: "error", message: "something went wrong" });
    }
  });

  server.post("/forgot-pass/set-password", async (req, res, next) => {
    console.log(req.body);
    try {
      const person = req.body;
      if (!(person && person.email && person.password))
        return res.jsonp({ status: "error", message: "invalid request data" });

      const userExist = DbHandler.find({
        table: "users",
        body: person,
        query: "email"
      });

      if (!userExist)
        return res.jsonp({ status: "error", message: "user does not exist" });

      if (userExist.email === person.email) {
        const newUser = DbHandler.updateUser({
          ...userExist,
          ...person,
          token: null
        });
        return res.jsonp({
          data: newUser,
          status: "success"
        });
      }

      return res.jsonp({
        status: "error",
        message: "wrong data provided"
      });
    } catch (e) {
      res.jsonp({ status: "error", message: "something went wrong" });
    }
  });
};
