const express = require("express");
const router = express.Router();
const ROLES = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");

const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");
const { createPollSchema } = require("../../validation/pollSchema");
const {
  createPollOptionSchema,
} = require("../../validation/pollOptionsSchema");
const { valid } = require("joi");
const { createPoll } = require("../../controllers/pollController");
const { createPollOption } = require("../../controllers/pollOpController");

router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollSchema),
  createPoll,
);

router.post(
  "/:pollId/options",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollOptionSchema),
  createPollOption,
);
module.exports = router;
