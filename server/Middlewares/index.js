const { ERRORS } = require("../Constants/app.constant");
const { BlogModel } = require("../Models/blog.model");
const { LikeModel } = require("../Models/like.model");

exports.verifyReLikeBlog = async function (req, res, next) {
  try {
    const blogId = req.query["blogId"];
    const Like = await LikeModel.findOne({
      blogId,
      userId: req.userId,
    });
    console.log("result = ", Like);
    if (Like) {
      res.status(500).send({
        message: ERRORS.BLOG_ALREADY_LIKED_BY_USER,
      });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.verifyDuplicateTag = async function (req, res, next) {
  try {
    const tags = req.body;
    tags?.forEach((tag) => {});
  } catch (error) {}
};
