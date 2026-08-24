const { listNotifications } = require("../services/notificationAdmin.service");

const getNotifications = async (req, res, next) => {
  try {
    const result = await listNotifications(req.query);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotifications,
};
