const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
      index: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
      index: true,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastAttemptAt: {
      type: Date,
      default: null,
    },
    nextAttemptAt: {
      type: Date,
      default: null,
      index: true,
    },
    processingStartedAt: {
      type: Date,
      default: null,
    },
    sentAt: {
      type: Date,
      default: null,
    },

    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
notificationSchema.index({
  status: 1,
  nextAttemptAt: 1,
});
notificationSchema.index({
  status: 1,
  processingStartedAt: 1,
});
notificationSchema.index(
  {
    pollId: 1,
    recipientId: 1,
    type: 1,
    channel: 1,
  },
  {
    unique: true,
  },
);
notificationSchema.index({
  pollId: 1,
  type: 1,
  channel: 1,
  createdAt: -1,
});
module.exports = mongoose.model("Notification", notificationSchema);
