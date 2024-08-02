const { model, Schema } = require("mongoose");
const { ProductModel } = require("./product.model");
const { CartModel } = require("./cart.model");
const { UserModel } = require("./auth.model");
const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    products: [{ type: Schema.Types.ObjectId, ref: "ProductsOrdered" }],
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    deliveryAddress: { type: Schema.Types.ObjectId, ref: "Address" },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentType: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
      required: true,
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
  // this.totalPrice = this.products?.reduce((acc, { quantity, price }) => {
  //   return acc + quantity * price;
  // }, 0);
  const date = new Date();
  date.setDate(date.getDate() + 5);
  this.deliveryDate = date;
  next();
});

OrderSchema.post("save", async function (doc) {
  const user = await UserModel.findOne({ _id: doc.userId });
  await CartModel.updateOne(
    { _id: user.cartId },
    { $pull: { products: { $in: doc.products } } }
  );
});

exports.OrderModel = model("Orders", OrderSchema);
