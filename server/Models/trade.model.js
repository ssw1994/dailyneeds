const { model, Schema } = require("mongoose");

exports.TradeModel = model(
  "Trades",
  new Schema(
    {
      amount: {
        type: Number,
        required: [true, "Amount is required for trade"],
      },
      userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
      description: { type: String },
      dateOfTrade: { type: Date, required: true },
    },
    { timestamps: true }
  )
);
