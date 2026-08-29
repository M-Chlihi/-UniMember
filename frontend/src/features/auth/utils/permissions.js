import { ROLE_PERMISSIONS } from "../constants/permissions";

export const hasPermission = (roles = [], permission) => {
  return roles.some((role) => ROLE_PERMISSIONS[role]?.includes(permission));
};

// hasPermission(
//   user.roles,
//   PERMISSIONS.POLL_CREATE,
// );
