const fsPromises = require("fs/promises");
const path = require("path");
const saveEmployees = async (arr) => {
  try {
    const data = JSON.stringify(arr, null, 2);
    await fsPromises.writeFile(
      path.join(__dirname, "../data", "employees.json"),
      data,
    );
  } catch (err) {
    throw err;
  }
};

module.exports = saveEmployees;
