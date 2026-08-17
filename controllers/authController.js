const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bycript = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const duplicate = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();
    if (duplicate) {
      return res.sendStatus(409).json({
        message: "Username or email already exists",
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
    const roles = Object.values(foundUser.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120s",
      },
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "20000s",
      },
    );

    // Store refresh token in MongoDB
    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    // create JWTs
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
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
