const saveEmployees = require("../utils/dataFormatter");
const jwt = require("jsonwebtoken");
const userDB = {
  users: require("../data/usersDB"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs/promises");
require("dotenv").config();

const hundleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find((e) => e.refreshToken === refreshToken);

  if (!foundUser) return res.sendStatus(403);
  // evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      },
    );
    res.json({ accessToken });
  });
  // res.json({
  //   message: `Login successful, user ${user} is logged in ! `,
  // });
};

module.exports = { hundleRefreshToken };
