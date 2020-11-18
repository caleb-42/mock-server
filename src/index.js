const jsonServer = require("json-server");
const server = jsonServer.create();

const db = require("../db")();

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("Json Server is running");
});
