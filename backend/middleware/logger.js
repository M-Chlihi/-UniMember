const { logEvent } = require("./logEvent");

const logger = (req, res, next) => {
  logEvent(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "requestLog.txt",
  );
  console.log(`${req.method} \n ${req.path}`);
  next();
};

module.exports = { logger };
