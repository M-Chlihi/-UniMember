const express = require("express");
const router = express.Router();
const ROLES = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");

const {
  createPollSchema,
  listPollsQuerySchema,
  updatePollSchema,
  historyQuerySchema,
} = require("../../validation/pollSchema");
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
  getPoll,
  getPollById,
  updatePollController,
  cancelPollController,
  deleteDraftPollController,
} = require("../../controllers/pollController");
const { createPollOption } = require("../../controllers/pollOpController");
const {
  castVote,
  getResults,
  getMyVote,
  getVotingHistoryController,
} = require("../../controllers/voteController");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(listPollsQuerySchema),
  getPoll,
);
router.get(
  "/history",
  verifyJWT,
  verifyRoles(ROLES.User, ROLES.Editor, ROLES.Admin),
  validate(historyQuerySchema, "query"),
  getVotingHistoryController,
);
router.get(
  "/active",
  verifyJWT,
  verifyRoles(ROLES.User, ROLES.Editor, ROLES.Admin),
  getActivePoll,
);

router.get(
  "/:pollId",
  verifyJWT,
  verifyRoles(ROLES.User, ROLES.Editor, ROLES.Admin),
  getPollById,
);
router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(createPollSchema),
  createPoll,
);
router.patch(
  "/:pollId",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  validate(updatePollSchema),
  updatePollController,
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
router.post(
  "/:pollId/cancel",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  cancelPollController,
);
router.post(
  "/:pollId/delete",
  verifyJWT,
  verifyRoles(ROLES.Admin, ROLES.Editor),
  deleteDraftPollController,
);
module.exports = router;
