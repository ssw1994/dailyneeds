const {
  default: mongoose,
  Types: { ObjectId },
} = require("mongoose");
const { ERRORS } = require("../Constants/app.constant");
const { BlogModel } = require("../Models/blog.model");
const { CommentModel } = require("../Models/comment.model");
const { LikeModel } = require("../Models/like.model");

exports.fetchBlogs = async function (req, res, next) {
  try {
    const blogId = req.query["blogId"];
    console.log("In blogs....");
    if (blogId) {
      const blogDetails = await BlogModel.aggregate([
        {
          $match: {
            _id: new ObjectId(blogId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },
        {
          $unwind: {
            path: "$createdBy",
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "likes",
            foreignField: "_id",
            as: "likedBy",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "likedBy.userId",
            foreignField: "_id",
            as: "likedBy",
          },
        },
        {
          $project: {
            "likedBy.password": 0,
          },
        },
      ]);
      res.status(200).send({
        data: blogDetails && blogDetails?.length > 0 ? blogDetails[0] : null,
        message: ERRORS.BLOG_FETCHED_SUCCESSFULLY,
      });
      return;
    } else {
      const blogs = await BlogModel.find();
      res.status(200).send({
        blogs,
        message: ERRORS.BLOGS_FETCHED_SUCCESSFULLY,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: ERRORS.SOMETHING_WENT_WRONG,
      error,
    });
    return;
  }
};

exports.createBlog = async function (req, res, next) {
  try {
    const blog = req.body;
    if (blog._id) {
      let updatedBlog = await BlogModel.findByIdAndUpdate(blog._id, blog);
      if (updatedBlog) {
        res.status(201).send({
          message: ERRORS.BLOG_UPDATED_SUCCESFULLY,
          updatedBlog,
        });
      } else {
        res.status(500).send({
          message: ERRORS.ERROR_IN_BLOG_UPDATATION,
        });
        return;
      }
      return;
    } else {
      const Blog = new BlogModel({ ...req.body, createdBy: req.userId });
      const blogDetails = await Blog.save();
      if (blogDetails) {
        res.status(201).send({
          message: ERRORS.BLOG_CREATED_SUCCESSFULLY,
          blogDetails,
        });
        return;
      }
    }
    res.status(500).send({
      message: ERRORS.BLOG_CREATION_FAILED,
    });
    return;
  } catch (error) {
    res.send({
      message: ERRORS.SOMETHING_WENT_WRONG,
      error,
    });
  }
};

exports.likeBlog = async function (req, res, next) {
  try {
    const blogId = req.query["blogId"];
    const LikeObj = { userId: req.userId, blogId };
    const Like = new LikeModel(LikeObj);
    console.log(LikeObj);
    const Liked = await Like.save();
    const data = await BlogModel.findByIdAndUpdate(blogId, {
      $push: {
        likes: Liked._id,
      },
    });
    const updatedBlog = await BlogModel.findById(blogId);
    console.log(updatedBlog);
    if (data) {
      res.status(200).send(updatedBlog);
      return;
    }
    res.status(500).send({
      message: ERRORS.ERROR_IN_BLOG_UPDATATION,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: ERRORS.ERROR_IN_BLOG_UPDATATION,
    });
    return;
  }
};

exports.addcomments = async function (req, res, next) {
  try {
    const blogId = req.query["blogId"];
    const Comment = new CommentModel();
    const Commented = await Comment.save({
      userId: req.userId,
      ...req.body,
    });
    const data = await BlogModel.findByIdAndUpdate(blogId, {
      $push: {
        comments: Commented._id,
      },
    });

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
