const express = require("express");
const router = express.Router();
const refreshTokenauthcontroller = require("../../controllers/refreshTokenController");
router.route("/").get(refreshTokenauthcontroller.hundleRefreshToken);
module.exports = router;
