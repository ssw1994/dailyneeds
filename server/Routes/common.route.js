const {
  fetchTags,
  addTags,
  removeTags,
} = require("../Controllers/common.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");
module.exports = function (app) {
  app.post("/tags/add", [verifyToken], addTags);
  app.get("/tags/all", [verifyToken], fetchTags);
  app.get("/tags/remove", [verifyToken], removeTags);
  return app;
};
