const env = require("./env");

const allowOrigins = [env.FRONTEND_ORIGIN].filter(Boolean);

module.exports = allowOrigins;
