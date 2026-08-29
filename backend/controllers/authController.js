const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { refreshCookieOptions } = require("../config/cookieOptions");

const bycript = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const duplicate = await User.findOne({
      $or: [{ email }],
    }).exec();
    if (duplicate) {
      return res.status(409).json({
        message: " email already exist",
      });
    } // conflict

    const hashePwd = await bycript.hash(password, 10);
    // create and store newUser
    const result = await User.create({
      username,
      email,
      password: hashePwd,
    });

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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and passwrod are required",
    });
  }

  try {
    const foundUser = await User.findOne({ email: email })
      .select("+password")
      .exec();
    if (!foundUser) return res.sendStatus(401);
    const match = await bycript.compare(password, foundUser.password);

    if (!match) {
      return res.sendStatus(401);
    }
    // add roles
    const roleNames = Object.entries(foundUser.roles)
      .filter(([, value]) => value)
      .map(([role]) => role);
    // create JWTs
    const accessToken = jwt.sign(
      {
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
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    );

    // Store refresh token in MongoDB
    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    res.cookie("jwt", refreshToken, refreshCookieOptions);
    res.json({
      accessToken,
      user: {
        id: foundUser._id.toString(),
        username: foundUser.username,
        email: foundUser.email,
        roles: roleNames,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { register, login };
