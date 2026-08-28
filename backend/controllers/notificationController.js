const { listNotifications } = require("../services/notificationAdmin.service");
const {
  getNotificationSummary,
} = require("../services/notificationAdminService");
const {
  getNotificationHistory,
} = require("../services/notificationAdmin.service");
const getNotifications = async (req, res, next) => {
  try {
    const result = await listNotifications(req.query);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getNotificationSummaryController = async (req, res, next) => {
  try {
    const result = await getNotificationSummary(req.query);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getNotificationHistoryController = async (req, res, next) => {
  try {
    const result = await getNotificationHistory(req.query);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getNotifications,
  getNotificationSummaryController,
  getNotificationHistoryController,
};
