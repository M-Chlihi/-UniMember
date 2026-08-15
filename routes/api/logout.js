const express = require("express");
const router = express.Router();
const logoutcontroller = require("../../controllers/logoutControoller");
router.route("/").post(logoutcontroller.hundleLogoutToken);
module.exports = router;
