const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const logEvent = async (message, fileName) => {
  const logDate = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const LogTime = `${logDate}\t${uuidv4()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      LogTime,
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = { logEvent };
