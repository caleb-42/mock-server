module.exports = function auth(server) {
  server.get("/profile", async (req, res, next) => {
    return res.jsonp({
      data: req.user,
      status: "success"
    });
  });
};
