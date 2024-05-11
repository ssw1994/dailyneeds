const {
  fetchBlogs,
  createBlog,
  likeBlog,
  addcomments,
} = require("../Controllers/blog.controller");
const { verifyReLikeBlog } = require("../Middlewares");
const { verifyToken } = require("../Middlewares/veriftyToken");

module.exports = function (app) {
  app.get("/", [verifyToken], fetchBlogs);
  app.post("/save", [verifyToken], createBlog);
  app.get("/like", [verifyToken, verifyReLikeBlog], likeBlog);
  app.get("/comment", [verifyToken], addcomments);
  return app;
};
