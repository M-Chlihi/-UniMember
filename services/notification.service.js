// services/notification.service.js

const Notification = require("../models/Notification");
const { sendEmail } = require("./provider/email.provider");

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

const deliverNotification = async (notificationId) => {
  const notification = await Notification.findById(notificationId)
    .populate("recipientId", "email username")
    .populate("pollId", "title")
    .exec();

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.status !== "PENDING") {
    return;
  }

  try {
    await sendEmail({
      to: notification.recipientId.email,
      subject: `CS Club — Poll Result`,
      text: `The poll "${notification.pollId.title}" has closed`,
    });

    notification.status = "SENT";
    notification.sentAt = new Date();

    await notification.save();
  } catch (err) {
    notification.status = "FAILED";
    notification.error = err.message;

    await notification.save();

    throw err;
  }
};

module.exports = {
  createPollResultNotification,
  deliverNotification,
};

// const notifyPollClosed = async ({ poll, results }) => {
//   const winner = results.winner;

//   if (!winner) {
//     console.log(`Poll ${poll._id} closed without a unique winner`);

//     return;
//   }

//   console.log(`Poll "${poll.title}" winner: ${winner.title}`);
// };

// module.exports = {
//   notifyPollClosed,
// };
