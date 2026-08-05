const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
router
  .route("/")
  .get(employeeController.getAllEmplyees)
  .post(employeeController.createNewEmplyees)
  .put(employeeController.updateEmplyees)
  .delete(employeeController.deleteEmplyees);

// router.put("/:id", employeeController.updateEmplyees);
router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
