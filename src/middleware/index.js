const Utils = require("../utils");
const DbHandler = require("../../dbHandler.js");

class Middleware {
  static async authenticate(req, res, next) {
    console.log("req", req.url);
    if (["/auth/register", "/auth/login"].includes(req.url)) {
      return next();
    }

    const token = req.headers["x-access-token"];
    try {
      const decodedToken = Utils.decodeToken(token);
      console.log(decodedToken);
      const user = DbHandler.find({
        table: "users",
        body: decodedToken,
        query: "id"
      });

      console.log("aa", user);
      if (!user) {
        return res.status(401).jsonp({ message: "Unauthorized access" });
      } else {
        req.user = user;
        return next();
      }
    } catch (error) {
      return res.status(401).jsonp({ message: "Unauthorized access" });
    }
  }
}

module.exports = Middleware;
