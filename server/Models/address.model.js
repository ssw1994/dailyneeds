const { model, Schema } = require("mongoose");
const { ProfileModel } = require("./profile.model");

const AddressSchema = new Schema(
  {
    country: { type: String, default: "India" },
    state: { type: String, default: "Maharashtra" },
    city: { type: String, required: true },
    postalCode: { type: Number },
    houseNo: { type: String },
    societyName: { type: String },
    contactNumber: { type: Number },
    profileId: { type: Schema.Types.ObjectId, refs: "Profiles" },
    addressType: {
      type: String,
      enum: ["HOME", "WORK", "OTHER"],
      default: "OTHER",
    },
  },
  { timestamps: true }
);

AddressSchema.post("save", function (next) {
  ProfileModel.findByIdAndUpdate(this.profileId, {
    $push: {
      address: this._id,
    },
  })
    .then(() => {
      next && typeof next === "function" && next();
    })
    .catch(() => {
      next && typeof next === "function" && next();
    });
});

AddressSchema.post("remove", function (doc) {
  ProfileModel.findByIdAndUpdate(doc.profileId, {
    $pop: {
      address: doc._id,
    },
  })
    .then(() => {
      console.log("Deleted successfully", doc?._id);
      //next && typeof next === "function" && next();
    })
    .catch(() => {
      console.log("Error in Deleting", doc?._id);
      //next && typeof next === "function" && next();
    });
});

exports.AddressModel = model("Addresses", AddressSchema);
