const { model, Schema, default: mongoose } = require("mongoose");

exports.TodoModel = model(
  "Todos",
  new Schema(
    {
      title: { type: String, required: true },
      estimatedTime: { type: Number, required: true },
      status: {
        type: String,
        enum: ["NEW", "ACTIVE", "COMPLETED"],
        default: "NEW",
        required: true,
      },
      description: { type: String },
      createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
    },
    { timestamps: true }
  )
);
