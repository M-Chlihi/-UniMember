const jwt = require("jsonwebtoken");
const User = require("../models/User");

const hundleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({
    refreshToken,
  }).exec();

  if (!foundUser) return res.sendStatus(403);
  // evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    const roleNames = Object.entries(foundUser.roles)
      .filter(([, value]) => value)
      .map(([role]) => role);
    const accessToken = jwt.sign(
      {
        // UserInfo: { username: foundUser.username, roles: roles },
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          roles: roleNames,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
    res.json({
      accessToken,
      user: {
        id: foundUser._id.toString(),
        username: foundUser.username,
        email: foundUser.email,
        roles: roleNames,
      },
    });
  });
};

module.exports = { hundleRefreshToken };
