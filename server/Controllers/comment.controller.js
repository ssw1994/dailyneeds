const { ERRORS } = require("../Constants/app.constant");
const { BlogModel } = require("../Models/blog.model");
const { CommentModel } = require("../Models/comment.model");
const { LikeModel } = require("../Models/like.model");
exports.addcomments = async function (req, res, next) {
  try {
    const blogId = req.query["blogId"];
    const parentId = req.query["parentId"];
    const Comment = new CommentModel({
      userId: req.userId,
      ...req.body,
    });
    console.log({
      userId: req.userId,
      ...req.body,
    });
    const Commented = await Comment.save();
    let data;
    if (parentId) {
      data = await CommentModel.findByIdAndUpdate(parentId, {
        $push: {
          feedbacks: Commented._id,
        },
      });
    } else if (blogId) {
      data = await BlogModel.findByIdAndUpdate(blogId, {
        $push: {
          comments: Commented._id,
        },
      });
    }

    res.status(200).send({
      message: ERRORS.COMMENTS_SAVED_SUCCESSFULLY,
      data,
    });
    return;
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_SAVING_COMMENT,
    });
  }
};

exports.fetchComments = async function (req, res, next) {
  try {
    const { blogId, parentId } = req.query;
    console.log("Here .....", blogId, parentId);
    let data = null;
    if (blogId) {
      data = await CommentModel.find({ blogId });
    } else if (parentId) {
      data = await CommentModel.find({ parentId });
    }
    if (data) {
      res.status(200).send({
        message: ERRORS.COMMENT_FETCHED_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_FETCHING_COMMENTS,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERRORS.ERROR_IN_FETCHING_COMMENTS,
      error,
    });
  }
};
exports.likeComment = async function (req, res, next) {
  try {
    const id = req.query["id"];
    const like = new LikeModel({
      commentId: id,
      userId: req.userId,
    });
    const liked = await like.save();
    if (liked) {
      res.status(201).send({
        message: ERRORS.LIKE_COMMENT_SUCCESSFULLY,
        data: liked,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_LIKING_COMMENT,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_LIKING_COMMENT,
    });
  }
};
