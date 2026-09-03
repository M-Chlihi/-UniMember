const { logEvent } = require("./logEvent");

const logger = (req, res, next) => {
  logEvent(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "requestLog.txt",
  );
  next();
};

module.exports = { logger };
