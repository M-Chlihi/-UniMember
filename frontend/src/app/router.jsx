import { createBrowserRouter } from "react-router-dom";

import { ROLES } from "../features/auth/constants/roles";
import App from "./App";
import LandingPage from "../features/public/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import RequireAuth from "../features/auth/componenets/RequireAuth";
import RequireGuest from "../features/auth/componenets/RequireGuest";
import RequireRole from "../features/auth/componenets/RequireRole";
import AppShell from "../components/layout/AppShell";
import MemberDashboardPage from "../features/dashboard/pages/MemberDashboard";
import ActivePoll from "../features/polls/pages/ActivePollPage";
import VotingHistory from "../features/voting/pages/VotingHistoryPage";
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminPollsPage from "../features/admin/polls/pages/AdminPollsPage";
import AdminPollDetailsPage from "../features/admin/polls/pages/AdminPollDetailsPage";
import CreatePollPage from "../features/admin/polls/pages/CreatePollPage";
import EditPollPage from "../features/admin/polls/pages/EditPollPage";
import AdminNotificationsPage from "../features/notifications/pages/notificationMangement";
import NotificationDeliveryPage from "../features/notifications/pages/notificationDeliveryPage";
import Forbidden from "../components/feedback/forbedding";
import NotFoundPage from "../components/feedback/NotFound";
import ActivePollPage from "../features/voting/pages/activePollPage";
import PollResultsPage from "../features/results/pages/pollResutlsPage";
import RequirePermission from "../features/auth/componenets/RequirePermission";
import { PERMISSIONS } from "../features/auth/constants/permissions";
import AdminUsersPage from "../features/admin/user/pages/AdminUsersPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <RequireGuest />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },

          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppShell />,
            children: [
              {
                path: "member",
                children: [
                  {
                    index: true,
                    element: <MemberDashboardPage />,
                  },
                  {
                    path: "poll",
                    element: <ActivePoll />,
                  },
                  {
                    path: "poll/:pollId",
                    element: <ActivePollPage />,
                  },
                  {
                    path: "poll/:pollId/results",
                    element: <PollResultsPage />,
                  },
                  {
                    path: "history",
                    element: <VotingHistory />,
                  },
                ],
              },

              {
                element: (
                  <RequireRole allowedRoles={[ROLES.ADMIN, ROLES.EDITOR]} />
                ),
                children: [
                  {
                    path: "admin",
                    element: <AdminDashboardPage />,
                  },
                  {
                    path: "admin/polls",
                    element: <AdminPollsPage />,
                  },
                  {
                    element: (
                      <RequirePermission permission={PERMISSIONS.POLL_CREATE} />
                    ),
                    children: [
                      {
                        path: "admin/polls/create",
                        element: <CreatePollPage />,
                      },
                    ],
                  },
                  {
                    path: "admin/polls/:pollId",
                    element: <AdminPollDetailsPage />,
                  },
                  {
                    element: (
                      <RequirePermission permission={PERMISSIONS.POLL_EDIT} />
                    ),
                    children: [
                      {
                        path: "admin/polls/:pollId/edit",
                        element: <EditPollPage />,
                      },
                    ],
                  },
                  {
                    element: (
                      <RequirePermission permission={PERMISSIONS.USER_MANAGE} />
                    ),
                    children: [
                      {
                        path: "admin/users",
                        element: <AdminUsersPage />,
                      },
                    ],
                  },
                  {
                    element: (
                      <RequirePermission
                        permission={PERMISSIONS.NOTIFICATION_VIEW}
                      />
                    ),
                    children: [
                      {
                        path: "admin/notifications",
                        element: <AdminNotificationsPage />,
                      },
                      {
                        path: "admin/notifications/:pollId",
                        element: <NotificationDeliveryPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
