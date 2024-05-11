const { Schema, model } = require("mongoose");

exports.TagModel = model(
  "Tags",
  new Schema(
    {
      tagName: { type: String, required: true },
      category: [{ type: String }],
    },
    { timestamps: true }
  )
);
