import { USER_ROLES } from "./userRoles";

const ROLE_IDS = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

export const buildRolesPayload = (role) => {
  const roles = {
    User: ROLE_IDS.User,
  };

  if (role === USER_ROLES.EDITOR) {
    roles.Editor = ROLE_IDS.Editor;
  }

  if (role === USER_ROLES.ADMIN) {
    roles.Admin = ROLE_IDS.Admin;
  }

  return roles;
};
