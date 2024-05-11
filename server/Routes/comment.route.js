const {
  fetchComments,
  addcomments,
  likeComment,
} = require("../Controllers/comment.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");

module.exports = function (app) {
  app.post("/", [verifyToken], addcomments);
  app.get("/view", [verifyToken], fetchComments);
  app.get("/like", [verifyToken], likeComment);
  return app;
};
