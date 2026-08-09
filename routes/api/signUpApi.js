const express = require("express");
const router = express.Router();
const validateUser = require("../../middleware/validateUser");
const authcontroller = require("../../controllers/authController");
router.route("/").post(validateUser, authcontroller.register);

// router.put("/:id", employeeController.updateEmplyees);
// router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
