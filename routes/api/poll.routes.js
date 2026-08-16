const express = require("express");
const router = express.Router();
const ROLES = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");

const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");
const { createPollSchema } = require("../../validation/pollSchema");
const {
  createPollOptionSchema,
  createVoteSchema,
} = require("../../validation/pollOptionsSchema");
const { valid } = require("joi");
const {
  createPoll,
  publishPollController,
  closePollController,
  getActivePoll,
} = require("../../controllers/pollController");
const { createPollOption } = require("../../controllers/pollOpController");
const {
  castVote,
  getResults,
  getMyVote,
} = require("../../controllers/voteController");

router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollSchema),
  createPoll,
);

router.get(
  "/active",
  verifyJWT,
  verifyRoles(ROLES.User, ROLES.Editor, ROLES.Admin),
  getActivePoll,
);

router.post(
  "/:pollId/options",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollOptionSchema),
  createPollOption,
);
// Is the user authenticated?
// Is the user allowed to vote?
// Does the poll exist?
// Is the poll OPEN?
// Does the option exist?
// Does the option belong to this poll?
// Has this user already voted in this poll?
// Create vote

router.post(
  "/:pollId/votes",
  verifyJWT,
  verifyRoles(ROLES.User, ROLES.Editor, ROLES.Admin),
  validate(createVoteSchema),
  castVote,
);

router.get("/:pollId/my-vote", verifyJWT, getMyVote);

router.get(
  "/:pollId/results",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  getResults,
);

router.post(
  "/:pollId/publish",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  publishPollController,
);
router.post(
  "/:pollId/close",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  closePollController,
);

module.exports = router;
