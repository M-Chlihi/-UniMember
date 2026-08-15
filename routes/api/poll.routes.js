const express = require("express");
const router = express.Router();
const ROLES = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");

const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");
const { createPollSchema } = require("../../validation/pollSchema");
const { valid } = require("joi");
const { createPoll } = require("../../controllers/pollController");

router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollSchema),
  createPoll,
);

module.exports = router;
