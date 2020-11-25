const jsonServer = require("json-server");
const server = jsonServer.create();
require("dotenv").config();

const db = require("../db");
const authMiddleware = require("./middleware");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const Routes = require("./routes");

server.get("/db", (req, res) => {
  res.jsonp(db);
});

server.use(jsonServer.bodyParser);

server.use(authMiddleware.authenticate);

Routes(server);
router.render = (req, res) => {
  res.jsonp({
    status: "success",
    data: res.locals.data
  });
};

server.use(middlewares);
server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Json Server is running");
});
