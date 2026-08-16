const jwt = require("jsonwebtoken");
const User = require("../models/User");

const hundleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies:", req.cookies);

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({
    refreshToken,
  }).exec();

  if (!foundUser) return res.sendStatus(403);
  // evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        // UserInfo: { username: foundUser.username, roles: roles },
        UserInfo: {
          id: foundUser._id,
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20000s",
      },
    );
    res.json({ accessToken });
  });
};

module.exports = { hundleRefreshToken };
