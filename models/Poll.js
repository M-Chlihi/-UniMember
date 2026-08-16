const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "OPEN", "CLOSED", "CANCELLED"],
      default: "DRAFT",
      index: true,
    },

    startsAt: {
      type: Date,
      required: true,
    },

    endsAt: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //  reference relationship.store user id rather than copy all trhe documents (data-modeling)
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Poll", pollSchema);
