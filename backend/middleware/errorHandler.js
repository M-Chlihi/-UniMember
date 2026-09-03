const { logEvent } = require("./logEvent");

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;

  const message =
    status >= 500 ? "Internal server error" : err.message || "Request failed";

  const logMessage = [
    `${req.method} ${req.path}`,
    `STATUS: ${status}`,
    `ERROR: ${err.name || "Error"}`,
    `MESSAGE: ${err.message || "Unknown error"}`,
    `STACK: ${err.stack || "No stack trace"}`,
  ].join(" | ");

  logEvent(logMessage, "errorsLog.txt");

  res.status(status).json({
    message,
  });
};

module.exports = { errorHandler };
