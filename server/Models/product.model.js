const { model, Schema } = require("mongoose");

exports.ProductModel = model(
  "Products",
  new Schema(
    {
      name: { type: String, required: [true, "Product name is missing"] },
      price: { type: Number, required: [true, "Price is required"] },
      images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
      discount: { type: Number, default: 0, min: 0, max: 100 },
      description: {
        type: String,
        required: [true, "Product Description is missing"],
      },
      stock: { type: Number, default: 1, min: 0 },
      tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
    },
    {
      timestamps: true,
    }
  )
);
