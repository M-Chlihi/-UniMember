const data = {
  employees: require("../data/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
console.log(data.employees.length);
const getAllEmplyees = (req, res) => {
  res.json(data.employees);
};
///:::::::::::::
const createNewEmplyees = (req, res) => {
  const newEmpolyee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    department: req.body.department,
    salary: req.body.salary,
    hireDate: req.body.hireDate,
    isActive: req.body.isActive,
  };
  if (
    !newEmpolyee.firstname ||
    !newEmpolyee.lastname ||
    !newEmpolyee.email ||
    !newEmpolyee.department ||
    newEmpolyee.salary < 0 ||
    !newEmpolyee.hireDate ||
    newEmpolyee.isActive === undefined
  ) {
    return res
      .status(400)
      .json({ message: "all employee fields  are required" });
  }
  data.setEmployees([...data.employees, newEmpolyee]);
  res.status(201).json(data.employees);
};
///:::::::::::::vvccc
///:::::::::::::
const updateEmplyees = (req, res) => {
  console.log("params:", req.params);
  console.log("body:", req.body);
  const employee = data.employees.find((e) => e.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(404)
      .json({ message: `employe ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  if (req.body.email) employee.email = req.body.email;
  if (req.body.department) employee.department = req.body.department;
  if (req.body.salary) employee.salary = req.body.salary;
  if (req.body.hireDate) employee.hireDate = req.body.hireDate;
  if (req.body.isActive !== undefined) employee.isActive = req.body.isActive;

  const filteredArray = data.employees.filter(
    (e) => e.id !== parseInt(req.body.id),
  );

  const unSortedArray = [...filteredArray, employee];

  data.setEmployees(
    unSortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)),
  );
  res.json(data.employees);
};
///:::::::::::::
///:::::::::::::
const deleteEmplyees = (req, res) => {
  const employee = data.employees.find((e) => e.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `employe ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (e) => e.id !== parseInt(req.body.id),
  );
  data.setEmployees([...filteredArray]);

  res.json(data.employees);
};
///:::::::::::::
///:::::::::::::

const getEmployee = (req, res) => {
  const employee = data.employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `employe ID ${req.body.id} not found` });
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
