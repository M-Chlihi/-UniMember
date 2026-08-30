export const USER_ROLES = Object.freeze({
  USER: "User",
  EDITOR: "Editor",
  ADMIN: "Admin",
});

export const USER_ROLE_OPTIONS = [
  {
    value: USER_ROLES.USER,
    label: "User",
  },
  {
    value: USER_ROLES.EDITOR,
    label: "Editor",
  },
  {
    value: USER_ROLES.ADMIN,
    label: "Admin",
  },
];
