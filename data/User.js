const mongoose = require("mongoose");
const { Editor } = require("../config/roles_list");
const Schema = mongoose.Schema;
const ROLES_LIST = require("../config/roles_list");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  roles: {
    User: {
      type: Number,
      default: ROLES_LIST.User,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  refreshToken: String,
});
module.exports = mongoose.model("User", UserSchema);
