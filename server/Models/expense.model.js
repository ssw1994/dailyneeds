const { Schema } = require("mongoose");

const ExpenseItem = new Schema({
  expenseFor: { type: String },
  expenseOf: { type: String },
  description: { type: String },
  date: { type: Date },
});

const ExpenseSchema = new Schema({});
