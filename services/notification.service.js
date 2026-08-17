// services/notification.service.js

const Notification = require("../models/Notification");
const { sendEmail } = require("./provider/email.provider");
const { getPollResults } = require("./vote.service");
const { buildPollResultEmail } = require("./notificationContent.service");
const { getNextAttemptAt } = require("../utils/retryPolicy");

const createPollResultNotification = async ({ poll, results, recipientId }) => {
  const notification = await Notification.create({
    pollId: poll._id,
    recipientId: poll.createdBy,
    type: "POLL_RESULT",
    channel: "EMAIL",
    status: "PENDING",
  });

  await deliverNotification(notification._id);

  return notification;
};

// const deliverNotification = async (notificationId) => {
//   const notification = await Notification.findById(notificationId)
//     .populate("recipientId", "email username")
//     .populate("pollId", "title")
//     .exec();

//   if (!notification) {
//     throw new Error("Notification not found");
//   }

//   if (notification.status === "SENT") {
//     return notification;
//   }

//   try {
//     await sendEmail({
//       to: notification.recipientId.email,
//       subject: `CS Club — Poll Result`,
//       text: `The poll "${notification.pollId.title}" has closed`,
//     });

//     notification.status = "SENT";
//     notification.sentAt = new Date();

//     await notification.save();
//   } catch (err) {
//     notification.status = "FAILED";
//     notification.error = err.message;

//     await notification.save();

//     throw err;
//   }
// };

// const deliverNotification = async (notificationId) => {
//   const notification = await Notification.findById(notificationId)
//     .populate("recipientId", "email username")
//     .populate("pollId", "title")
//     .exec();

//   if (!notification) {
//     throw new Error("Notification not found");
//   }

//   if (notification.status === "SENT") {
//     return notification;
//   }

//   notification.status = "PROCESSING";
//   notification.attempts += 1;
//   notification.lastAttemptAt = new Date();
//   notification.error = undefined;

//   await notification.save();

//   try {
//     const result = await sendEmail({
//       to: notification.recipientId.email,
//       subject: `CS Club — Poll Result`,
//       html: `
//         <h2>${notification.pollId.title}</h2>
//         <p>The poll has closed.</p>
//       `,
//       idempotencyKey: `poll-result:${notification.pollId._id}:${notification.recipientId._id}`,
//     });

//     notification.status = "SENT";
//     notification.sentAt = new Date();

//     await notification.save();

//     return {
//       notification,
//       providerResponse: result,
//     };
//   } catch (err) {
//     notification.status = "FAILED";
//     notification.error = err.message;

//     await notification.save();

//     throw err;
//   }
// };

const deliverNotification = async (notificationId) => {
  const notification = await Notification.findById(notificationId)
    .populate("recipientId", "email username")
    .populate("pollId", "title")
    .exec();

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.status === "SENT") {
    return notification;
  }

  notification.status = "PROCESSING";
  notification.attempts += 1;
  notification.lastAttemptAt = new Date();
  notification.error = undefined;

  await notification.save();

  try {
    const results = await getPollResults(notification.pollId._id);

    const { subject, html } = buildPollResultEmail({
      poll: notification.pollId,
      results,
    });

    const result = await sendEmail({
      to: notification.recipientId.email,
      subject,
      html,
      idempotencyKey: `poll-result:${notification.pollId._id}:${notification.recipientId._id}`,
    });

    notification.status = "SENT";
    notification.sentAt = new Date();

    await notification.save();

    return result;
  } catch (err) {
    notification.status = "FAILED";
    notification.error = err.message;
    notification.nextAttemptAt = getNextAttemptAt(notification.attempts);
    await notification.save();

    throw err;
  }
};

module.exports = {
  createPollResultNotification,
  deliverNotification,
};
