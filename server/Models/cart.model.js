const { model, Schema } = require("mongoose");
const { ProductModel } = require("./product.model");

exports.CartModel = model(
  "Carts",
  new Schema(
    {
      products: [{ type: Schema.Types.ObjectId, ref: "ProductsOrdered" }],
    },
    { timestamps: true }
  )
);

exports.WishModel = model(
  "Wishs",
  new Schema(
    {
      products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    },
    {
      timestamps: true,
    }
  )
);

const ProductOrderedSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, min: 1, default: 1 },
    price: { type: Number, min: 1 },
    cartId: { type: Schema.Types.ObjectId, ref: "Carts" },
  },
  { timestamps: true }
);

exports.OrderedProduct = model("ProductsOrdered", ProductOrderedSchema);

ProductOrderedSchema.pre("save", async function (next) {
  const productDetails = await ProductModel.findOne({ _id: this.productId });
  this.price = productDetails?.price;
  next();
});

ProductOrderedSchema.post("save", async function (next) {
  await ProductModel.findByIdAndUpdate(this.productId, {
    $set: { stock: -this.quantity },
  });
  next();
});
