const mongoose = require("mongoose");
const { Editor } = require("../config/roles_list");
const Schema = mongoose.Schema;
const ROLES = require("../config/roles_list");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    roles: {
      User: {
        type: Number,
        default: ROLES.User,
      },

      Editor: {
        type: Number,
      },

      Admin: {
        type: Number,
      },
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
