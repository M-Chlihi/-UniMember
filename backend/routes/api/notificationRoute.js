const express = require("express");
const router = express.Router();
const ROLE_NAMES = require("../../config/roleNames");

const validate = require("../../middleware/validation");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

const {
  notificationListQuerySchema,
} = require("../../validation/notificationSchema");
const {
  getNotifications,
  getNotificationSummaryController,
} = require("../../controllers/notificationController");
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
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
