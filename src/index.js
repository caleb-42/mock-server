const jsonServer = require("json-server");
const server = jsonServer.create();
require("dotenv").config();

const db = require("../db");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const Routes = require("./routes");

server.get("/db", (req, res) => {
  res.jsonp(db);
});

server.use(jsonServer.bodyParser);

Routes(server);

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT, () => {
  console.log("Json Server is running");
});
