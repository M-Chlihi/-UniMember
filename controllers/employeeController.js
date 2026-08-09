const Employee = require("../data/Employee");

// console.log(data.employees.length);
const getAllEmplyees = async (req, res) => {
  let employees = await Employee.find();
  const { department, isActive, sort, page = "1", limit = "10" } = req.query;
  console.log(typeof req.query.isActive);
  if (employees.length === 0) {
    return res.status(204).json({ message: "no employees found" });
  }
  if (department) {
    employees = employees.filter(
      (employee) => employee.department === department,
    );
  }

  if (isActive) {
    employees = employees.filter(
      (employee) => employee.isActive === (isActive === "true"),
    );
  }
  if (sort === "salary") {
    employees.sort((a, b) => a.salary - b.salary);
  }
  if (sort === "-salary") {
    employees.sort((a, b) => b.salary - a.salary);
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const paginatedEmployees = employees.slice(skip, skip + limitNumber);

  res.json(paginatedEmployees);
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
      department: req.body.department,
      salary: req.body.salary,
      isActive: req.body.isActive,
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
  if (req.body?.department) employee.department = req.body.department;
  if (req.body?.salary) employee.salary = req.body.salary;
  if (req.body?.isActive) employee.isActive = req.body.isActive;

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
