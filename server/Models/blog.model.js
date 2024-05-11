const { Schema, model } = require("mongoose");

exports.BlogModel = model(
  "Blogs",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: { type: String, required: true },
      contents: {
        type: String,
        required: true,
      },
      createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
      comments: [{ type: Schema.Types.ObjectId, ref: "Comments", default: [] }],
      likes: [{ type: Schema.Types.ObjectId, ref: "Likes", default: [] }],
      tags: [{ type: Schema.Types.ObjectId, refs: "Tags", default: [] }],
      imgs: {
        type: [{ type: Schema.Types.ObjectId, ref: "Image" }],
        required: false,
        default: [],
      },
    },
    { timestamps: true }
  )
);
