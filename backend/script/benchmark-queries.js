const results = await Employee.find({ department: "IT" }).explain(
  "executionStats",
);
console.log(results);
