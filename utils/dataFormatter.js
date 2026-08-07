const fsPromises = require("fs/promises");
const path = require("path");
const saveEmployees = async (arr, fileName) => {
  try {
    const data = JSON.stringify(arr, null, 2);
    await fsPromises.writeFile(path.join(__dirname, "../data", fileName), data);
  } catch (err) {
    throw err;
  }
};

module.exports = saveEmployees;
