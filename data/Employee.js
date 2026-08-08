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
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  salary: {
    type: Number,
    required: false,
  },
  hireDate: {
    type: Date,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Employee", employeeSchema);
