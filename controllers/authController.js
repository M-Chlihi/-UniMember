const saveEmployees = require("../utils/dataFormatter");
const jwt = require("jsonwebtoken");
const userDB = {
  users: require("../data/usersDB"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs/promises");
const path = require("path");
const bycript = require("bcrypt");
require("dotenv").config();

console.log(userDB.users.length);

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and passwrod are required",
    });
  }
  const duplicate = userDB.users.find((e) => e.username === username);
  if (duplicate) return res.sendStatus(409); // conflict

  const hashePwd = await bycript.hash(password, 10);
  const newUser = {
    username,
    password: hashePwd,
  };

  // save newUser in thhe DB :
  userDB.setUsers([...userDB.users, newUser]);
  saveEmployees(userDB.users, "usersDB.json");

  res.status(201).json({
    message: "user registred successfully",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and passwrod are required",
    });
  }
  const foundUser = userDB.users.find((e) => e.username === req.body.username);

  if (!foundUser) return res.sendStatus(401);
  const match = await bycript.compare(password, foundUser.password);

  if (!match) {
    return res.sendStatus(401);
  }

  // create JWTs
  const accessToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
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

  const otherUsers = userDB.users.filter((p) => p.username !== foundUser);
  const currentUser = { ...foundUser, refreshToken };
  userDB.setUsers([...otherUsers, currentUser]);
  saveEmployees(userDB.users, "usersDB.json");

  // create JWTs
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAgge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
  // res.json({
  //   message: `Login successful, user ${user} is logged in ! `,
  // });
};
module.exports = { register, login };
