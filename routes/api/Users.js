const express = require("express");

const router = express.Router();

const {
  updateUserRoles,
  GETUser,
} = require("../../controllers/userController");

const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");

const { updateRolesSchema } = require("../../validation/authSchema");

const ROLES_LIST = require("../../config/roles_list");
router.route("/").get(GETUser);
router.patch(
  "/:id/roles",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  validate(updateRolesSchema),
  updateUserRoles,
);

module.exports = router;
