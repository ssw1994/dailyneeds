const { Schema, model } = require("mongoose");

exports.ProfileModel = model(
  "Profiles",
  new Schema(
    {
      firstName: String,
      lastName: String,
      mobile: String,
      email: String,
      picture: String,
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      address: [
        {
          type: Schema.Types.ObjectId,
          ref: "Address",
          default: [],
          required: false,
        },
      ],
    },
    { timestamps: true }
  )
);
