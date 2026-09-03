const env = require("./env");

const refreshCookieOptions = {
  httpOnly: true,
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  secure: env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

module.exports = {
  refreshCookieOptions,
};
