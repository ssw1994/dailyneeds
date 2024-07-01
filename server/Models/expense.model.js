const { Schema, model, default: mongoose } = require("mongoose");

const ExpenseSchema = new Schema({
  expenseFor: { type: String },
  expenseOf: { type: String },
  description: { type: String },
  date: { type: Date },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

exports.ExpenseModel = model("expenses", ExpenseSchema);
