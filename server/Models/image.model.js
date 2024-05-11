const { Schema, model } = require("mongoose");
exports.ImageModel = model(
  "Images",
  new Schema(
    {
      url: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: false,
        default: "",
      },
      order: { type: Number, default: -1 },
    },
    {
      timestamps: true,
    }
  )
);
