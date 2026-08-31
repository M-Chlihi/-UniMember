const express = require("express");
const router = express.Router();
const ROLE_NAMES = require("../../config/roleNames");

const validate = require("../../middleware/validation");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

const {
  notificationListQuerySchema,
  notificationHistoryQuerySchema,

  notificationSummaryQuerySchema,
} = require("../../validation/notificationSchema");
const {
  getNotifications,
  getNotificationSummaryController,
  getNotificationHistoryController,
} = require("../../controllers/notificationController");
router.get(
  "/history",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
  validate(notificationHistoryQuerySchema, "query"),
  getNotificationHistoryController,
);

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  validate(notificationListQuerySchema, "query"),
  getNotifications,
);
router.get(
  "/summary",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
  validate(notificationListQuerySchema, "query"),
  getNotificationSummaryController,
);
module.exports = router;
