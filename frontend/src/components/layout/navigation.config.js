import { ROLES } from "../../features/auth/constants/roles";

export const navigationItems = [
  {
    label: "Dashboard",
    path: "/member",
    roles: [ROLES.USER, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    label: "Active Poll",
    path: "/member/poll",
    roles: [ROLES.USER, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    label: "History",
    path: "/member/history",
    roles: [ROLES.USER, ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    label: "Admin Dashboard",
    path: "/admin",
    roles: [ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    label: "Poll Management",
    path: "/admin/polls",
    roles: [ROLES.EDITOR, ROLES.ADMIN],
  },
  {
    label: "Notifications",
    path: "/admin/notifications",
    roles: [ROLES.ADMIN],
  },
];
