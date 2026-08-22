const isProduction = process.env.NODE_ENV === "production";

const refreshCookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

module.exports = {
  refreshCookieOptions,
};
