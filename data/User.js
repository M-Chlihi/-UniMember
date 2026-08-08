const mongoose = require("mongoose");
const { Editor } = require("../config/roles_list");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});
module.exports = mongoose.model("User", UserSchema);
