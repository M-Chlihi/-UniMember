const User = require("../../models/User");
const ROLES = require("../../config/roles_list");

const users = {
  admin: {
    username: "TestAdmin",
    email: "admin@example.com",
    password: "AdminPassword123!",
  },
  editor: {
    username: "TestEditor",
    email: "editor@example.com",
    password: "EditorPassword123!",
  },
  user: {
    username: "TestUser",
    email: "user@example.com",
    password: "UserPassword123!",
  },
};

const seedRoles = async () => {
  await User.updateOne(
    { email: users.admin.email },
    { $set: { "roles.Admin": ROLES.Admin } },
  );

  await User.updateOne(
    { email: users.editor.email },
    { $set: { "roles.Editor": ROLES.Editor } },
  );
};

module.exports = { users, seedRoles };
