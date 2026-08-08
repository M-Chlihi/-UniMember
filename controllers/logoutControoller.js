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

const hundleLogoutToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //no content
  }
  const refreshToken = cookies.jwt;
  // is refreshToken in db ?
  const foundUser = userDB.users.find((e) => e.refreshToken === refreshToken);

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });

    return res.sendStatus(204);
  }
  // delete refreshToken from db
  const otherUsers = userDB.users.filter(
    (e) => e.refreshToken !== foundUser.refreshToken,
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  saveEmployees(userDB.users, "usersDB.json");

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: "true" }); // secure : true (just in production )
};

module.exports = { hundleLogoutToken };
