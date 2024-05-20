const { Schema, model, default: mongoose } = require("mongoose");

const DayPlanSchema = new Schema({
  destination: { type: String },
  location: { latitude: Number, longitude: Number },
  date: { type: Date },
  expense: [],
  contactPerson: {
    name: String,
    mobile: Number,
    email: String,
    address: String,
  },
});

const TourSchema = new Schema({
  name: { type: String, required: [true, "Tour name is required"] },
  fromDate: { type: Date, required: [true, "Tour from date is required"] },
  toDate: { type: Date, required: [true, "Tour to date is required"] },
  dayPlans: [],
});

exports.TourModel = model("tours", TourSchema);
