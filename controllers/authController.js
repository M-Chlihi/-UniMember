const saveEmployees = require("../utils/dataFormatter");

const userDB = {
  users: require("../data/usersDB"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs/promises");
const path = require("path");
const bycript = require("bcrypt");

console.log(userDB.users.length);

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and passwrod are required",
    });
  }

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
  const foundUser = userDB.users.find((e) => e.username === req.body.username);

  if (!foundUser) return res.sendStatus(401);
  const match = await bycript.compare(password, foundUser.password);

  if (!match) {
    return res.sendStatus(401);
  }

  res.json({
    message: "Login successful",
  });
};
module.exports = { register, login };
