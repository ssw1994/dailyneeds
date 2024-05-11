const { model, Schema } = require("mongoose");
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
  this.totalPrice = this.products?.reduce((acc, { quantity, price }) => {
    return acc + quantity * price;
  }, 0);
  next();
});

exports.Order = model("Orders", OrderSchema);
