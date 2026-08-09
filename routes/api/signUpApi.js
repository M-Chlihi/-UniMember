const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validation");
const { registerSchema } = require("../../validation/authSchema");
const authcontroller = require("../../controllers/authController");
router.route("/").post(validate(registerSchema), authcontroller.register);

// router.put("/:id", employeeController.updateEmplyees);
// router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
