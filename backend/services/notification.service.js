// services/notification.service.js

const Notification = require("../models/Notification");

const {
  NOTIFICATION_STATUS,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_TYPE,
} = require("../utils/notificationConstantes");

const {
  MAX_ATTEMPTS,
  calculateNextAttemptAt,
} = require("../utils/retryPolicy");

const { getPollResults } = require("./vote.service");

const { buildPollResultEmail } = require("./notificationContent.service");

const { sendEmail } = require("./provider/email.provider");

const createPollResultNotification = async ({ poll, recipientId }) => {
  const notification = await Notification.create({
    pollId: poll._id,
    recipientId,

    type: NOTIFICATION_TYPE.POLL_RESULT,

    channel: NOTIFICATION_CHANNEL.EMAIL,

    status: NOTIFICATION_STATUS.PENDING,

    attempts: 0,
  });

  return notification;
};

const deliverClaimedNotification = async (notification) => {
  if (notification.status !== NOTIFICATION_STATUS.PROCESSING) {
    throw new Error("Notification must be PROCESSING");
  }

  try {
    const recipient = notification.recipientId;

    const poll = notification.pollId;

    if (!recipient?.email) {
      throw new Error("Recipient email not found");
    }

    if (!poll?.title) {
      throw new Error("Poll title not found");
    }

    const results = await getPollResults(poll._id);

    const { subject, html } = buildPollResultEmail({
      poll,
      results,
    });

    const idempotencyKey = `poll-result:${poll._id}:${recipient._id}`;

    await sendEmail({
      to: recipient.email,
      subject,
      html,
      idempotencyKey,
    });

    notification.status = NOTIFICATION_STATUS.SENT;

    notification.sentAt = new Date();

    notification.processingStartedAt = null;

    notification.nextAttemptAt = null;

    notification.error = null;

    await notification.save();

    return notification;
  } catch (err) {
    notification.status = NOTIFICATION_STATUS.FAILED;

    notification.processingStartedAt = null;

    notification.error = err.message;

    if (notification.attempts < MAX_ATTEMPTS) {
      notification.nextAttemptAt = calculateNextAttemptAt(
        notification.attempts,
      );
    } else {
      notification.nextAttemptAt = null;
    }

    await notification.save();

    throw err;
  }
};

module.exports = {
  createPollResultNotification,
  deliverClaimedNotification,
};
