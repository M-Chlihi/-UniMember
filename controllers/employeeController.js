const Employee = require("../data/Employee");

// console.log(data.employees.length);
const getAllEmplyees = async (req, res) => {
  const employees = await Employee.find();
  if (employees.length === 0) {
    return res.status(204).json({ message: "no employees found" });
  }
  res.json(employees);
};
///:::::::::::::
const createNewEmplyees = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "first and last name are required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
///:::::::::::::vvccc
///:::::::::::::
const updateEmplyees = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `employe ID ${req.body.id} not found` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  if (req.body?.email) employee.email = req.body.email;
  if (req.body?.department) employee.department = req.body.department;
  if (req.body?.salary) employee.salary = req.body.salary;
  if (req.body?.hireDate) employee.hireDate = req.body.hireDate;
  if (req.body?.isActive !== undefined) employee.isActive = req.body.isActive;

  const result = await employee.save();

  res.json(result);
};
///:::::::::::::
///:::::::::::::
const deleteEmplyees = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "employee ID required" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `employe ID ${req.body.id} not found` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });

  res.json(result);
};
///:::::::::::::
///:::::::::::::

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "employee ID required" });
  }

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `employe ID ${req.params.id} not found` });
  }
  res.json(employee);
};
///:::::::::::::
module.exports = {
  getAllEmplyees,
  createNewEmplyees,
  updateEmplyees,
  deleteEmplyees,
  getEmployee,
};
