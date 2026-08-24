// const saveEmployees = require("../utils/dataFormatter");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { refreshCookieOptions } = require("../config/cookieOptions");

const hundleLogoutToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //no content
  }
  const refreshToken = cookies.jwt;
  // is refreshToken in db ?
  try {
    // Find the user who owns this refresh token
    const foundUser = await User.findOne({
      refreshToken,
    }).exec();

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204);
    }

    // Remove refresh token from MongoDB
    foundUser.refreshToken = "";

    await foundUser.save();

    // Remove refresh token from browser
    res.clearCookie("jwt", refreshCookieOptions);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { hundleLogoutToken };
