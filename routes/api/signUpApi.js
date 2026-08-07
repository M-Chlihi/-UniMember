const express = require("express");
const router = express.Router();
const authcontroller = require("../../controllers/authController");
router.route("/").post(authcontroller.register);

// router.put("/:id", employeeController.updateEmplyees);
// router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
