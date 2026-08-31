import {
  LayoutDashboard,
  Vote,
  History,
  PanelsTopLeft,
  ClipboardList,
  Bell,
  Users,
} from "lucide-react";

import { PERMISSIONS } from "../../features/auth/constants/permissions";

export const navigationSections = [
  {
    key: "main",
    label: "Main",

    items: [
      {
        label: "Dashboard",
        path: "/member",
        icon: LayoutDashboard,
        end: true,
      },

      {
        label: "Active polls",
        path: "/member/poll",
        icon: Vote,
        end: true,
      },

      {
        label: "History",
        path: "/member/history",
        icon: History,
        end: true,
      },
    ],
  },

  {
    key: "management",
    label: "Management",

    items: [
      {
        label: "Admin dashboard",
        path: "/admin",
        icon: PanelsTopLeft,
        permission: PERMISSIONS.ADMIN_DASHBOARD_VIEW,
        end: true,
      },

      {
        label: "Poll management",
        path: "/admin/polls",
        icon: ClipboardList,
        permission: PERMISSIONS.POLL_VIEW_MANAGEMENT,
        end: false,
      },

      {
        label: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
        permission: PERMISSIONS.NOTIFICATION_VIEW,
        end: false,
      },

      {
        label: "Users",
        path: "/admin/users",
        icon: Users,
        permission: PERMISSIONS.USER_MANAGE,
        end: true,
      },
    ],
  },
];
