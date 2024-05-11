const { model, Schema } = require("mongoose");

exports.LikeModel = model(
  "Likes",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      blogId: { type: Schema.Types.ObjectId, ref: "Blogs" },
      commentId: { type: Schema.Types.ObjectId, ref: "Comments" },
    },
    { timestamps: true }
  )
);
