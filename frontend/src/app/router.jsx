import { createBrowserRouter } from "react-router-dom";

import { ROLES } from "../features/auth/constants/roles";
import App from "./App";
import LandingPage from "../features/public/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import RequireAuth from "../features/auth/componenets/RequireAuth";
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
import ActivePollPage from "../features/voting/pages/activePollPage";
import PollResultsPage from "../features/results/pages/pollResutlsPage";

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
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
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
                    path: "admin/polls/create",
                    element: <CreatePollPage />,
                  },
                  {
                    path: "admin/polls/:pollId",
                    element: <AdminPollDetailsPage />,
                  },
                  {
                    path: "admin/polls/:pollId/edit",
                    element: <EditPollPage />,
                  },
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

      {
        path: "forbidden",
        element: <Forbidden />,
      },
    ],
  },
]);
