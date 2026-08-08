// const saveEmployees = require("../utils/dataFormatter");
const User = require("../data/User");
const jwt = require("jsonwebtoken");
// const userDB = {
//   users: require("../data/usersDB"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const bycript = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and passwrod are required",
    });
  }

  try {
    // const duplicate = userDB.users.find((e) => e.username === username);
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); // conflict

    const hashePwd = await bycript.hash(password, 10);
    // create and store newUser
    const result = await User.create({
      username: username,
      password: hashePwd,
    });
    console.log(result);

    res.status(201).json({
      message: "user registred successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and passwrod are required",
    });
  }

  try {
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) return res.sendStatus(401);
    const match = await bycript.compare(password, foundUser.password);

    if (!match) {
      return res.sendStatus(401);
    }
    // add roles
    const roles = Object.values(foundUser.roles);

    // add roles
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: { username: foundUser.username, roles: roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      },
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Store refresh token in MongoDB
    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    // const currentUser = { ...foundUser, refreshToken };
    // userDB.setUsers([...otherUsers, currentUser]);
    // saveEmployees(userDB.users, "usersDB.json");

    // create JWTs
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { register, login };
