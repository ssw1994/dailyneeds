const { model, Schema, SchemaType } = require("mongoose");

exports.CommentModel = model(
  "Comments",
  new Schema(
    {
      blogId: { type: Schema.Types.ObjectId, ref: "Blogs" },
      parentId: { type: Schema.Types.ObjectId, ref: "Comments" },
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      comment: { type: String, required: true },
      likes: [{ type: Schema.Types.ObjectId, ref: "Likes", default: [] }],
      feedbacks: [
        { type: Schema.Types.ObjectId, ref: "Comments", default: [] },
      ],
    },
    { timestamps: true }
  )
);
