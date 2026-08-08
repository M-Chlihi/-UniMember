const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("Employee", employeeSchema);
