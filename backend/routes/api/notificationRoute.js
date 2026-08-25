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
} = require("../../controllers/notificationController");
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
  validate(notificationListQuerySchema, "query"),
  getNotifications,
);

module.exports = router;
