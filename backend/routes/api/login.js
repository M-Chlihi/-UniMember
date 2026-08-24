const express = require("express");
const validate = require("../../middleware/validation");
const { loginSchema } = require("../../validation/authSchema");
const router = express.Router();
const authcontroller = require("../../controllers/authController");
router.route("/").post(validate(loginSchema), authcontroller.login);
module.exports = router;
