const { logEvent } = require("./logEvent");

const errorHandler = (err, req, res, next) => {
  logEvent(`${err.name}\t${err.message}`, "errorsLog.txt");

  console.error(err.stack);

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    message: status === 500 ? "Internal server error" : err.message,
  });
};

module.exports = {
  errorHandler,
};
