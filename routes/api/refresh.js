const express = require("express");
const router = express.Router();
const refreshTokenauthcontroller = require("../../controllers/refreshTokenController");
router.route("/").post(refreshTokenauthcontroller.hundleRefreshToken);
module.exports = router;
