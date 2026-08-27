const express = require("express");
const router = express.Router();
const ROLE_NAMES = require("../../config/roleNames");
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
  "/active",
  verifyJWT,
  verifyRoles(ROLE_NAMES.User, ROLE_NAMES.Admin),
  getActivePoll,
);
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  validate(listPollsQuerySchema),
  getPoll,
);

router.get(
  "/history",
  verifyJWT,
  verifyRoles(ROLE_NAMES.User, ROLE_NAMES.Editor, ROLE_NAMES.Admin),
  validate(historyQuerySchema, "query"),
  getVotingHistoryController,
);

router.get(
  "/:pollId",
  verifyJWT,
  verifyRoles(ROLE_NAMES.User, ROLE_NAMES.Editor, ROLE_NAMES.Admin),
  getPollById,
);
router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  validate(createPollSchema),
  createPoll,
);
router.patch(
  "/:pollId",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  validate(updatePollSchema),
  updatePollController,
);

router.post(
  "/:pollId/options",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
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
  verifyRoles(ROLE_NAMES.User, ROLE_NAMES.Editor, ROLE_NAMES.Admin),
  validate(createVoteSchema),
  castVote,
);

router.get("/:pollId/my-vote", verifyJWT, getMyVote);

router.get(
  "/:pollId/results",
  verifyJWT,
  verifyRoles(ROLE_NAMES.User, ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  getResults,
);

router.post(
  "/:pollId/publish",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  publishPollController,
);
router.post(
  "/:pollId/close",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  closePollController,
);
router.post(
  "/:pollId/cancel",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  cancelPollController,
);
router.delete(
  "/:pollId/delete",
  verifyJWT,
  verifyRoles(ROLE_NAMES.Admin, ROLE_NAMES.Editor),
  deleteDraftPollController,
);
module.exports = router;
