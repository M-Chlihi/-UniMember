const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
const Roles = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
router
  .route("/")
  .get(employeeController.getAllEmplyees)
  .post(
    verifyRoles(Roles.Admin, Roles.Editor),
    employeeController.createNewEmplyees,
  )
  .put(
    verifyRoles(Roles.Admin, Roles.Editor),
    employeeController.updateEmplyees,
  )
  .delete(verifyRoles(Roles.Admin), employeeController.deleteEmplyees);

// router.put("/:id", employeeController.updateEmplyees);
router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
