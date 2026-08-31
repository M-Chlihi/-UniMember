const express = require("express");

const router = express.Router();
const ROLE_NAMES = require("../../config/roleNames");

const {
  updateUserRoles,
  GETUser,
} = require("../../controllers/userController");

const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");

const {
  updateRolesSchema,
  usersListQuerySchema,
} = require("../../validation/authSchema");
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
  validate(usersListQuerySchema, "query"),
  GETUser,
);
router.patch(
  "/:id/roles",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin),
  validate(updateRolesSchema),
  updateUserRoles,
);

module.exports = router;
