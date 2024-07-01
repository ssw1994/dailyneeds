const { Schema, model, default: mongoose } = require("mongoose");

const DayPlanSchema = new Schema({
  destination: { type: String },
  location: { latitude: Number, longitude: Number },
  fromDate: { type: Date },
  toDate: { type: Date },
  expense: [{ type: mongoose.Types.ObjectId, ref: "expenses" }],
  contactDetails: {
    name: String,
    mobile: Number,
    email: String,
    address: String,
  },
  hotelDetails: {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    number: { type: String },
    location: { latitude: Number, longitude: Number },
  },
  tourId: { type: mongoose.Types.ObjectId, ref: "tours" },
  images: [{ type: mongoose.Types.ObjectId, ref: "Images" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

exports.DayPlanModel = model("dayPlans", DayPlanSchema);

const TourSchema = new Schema({
  name: { type: String, required: [true, "Tour name is required"] },
  fromDate: { type: Date, required: [true, "Tour from date is required"] },
  toDate: { type: Date, required: [true, "Tour to date is required"] },
  dayPlans: [{ type: mongoose.Types.ObjectId, ref: "dayPlans" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  images: [{ type: mongoose.Types.ObjectId, ref: "Images" }],
});

exports.TourModel = model("tours", TourSchema);
