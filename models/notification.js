const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["POLL_RESULT"],
      required: true,
    },

    channel: {
      type: String,
      enum: ["EMAIL", "WHATSAPP"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SENT", "FAILED"],
      default: "PENDING",
    },

    attempts: {
      type: Number,
      default: 0,
    },

    lastAttemptAt: {
      type: Date,
    },
    nextAttemptAt: {
      type: Date,
      default: null,
    },
    sentAt: {
      type: Date,
    },

    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
