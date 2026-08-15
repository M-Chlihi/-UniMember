const express = require("express");
const router = express.Router();
const Roles = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const validate = require("../../middleware/validation");
const employeeQuerySchema = require("../../validation/employeeSchema");
const { valid } = require("joi");
router
  .route("/")
  .get()
  .post(validate(employeeQuerySchema), verifyRoles(Roles.Admin, Roles.Editor))
  .put(validate(employeeQuerySchema), verifyRoles(Roles.Admin, Roles.Editor))
  .delete(verifyRoles(Roles.Admin));

router.route("/:id").get();

module.exports = router;
