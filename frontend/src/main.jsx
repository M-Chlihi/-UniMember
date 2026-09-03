import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import AppErrorBoundary from "./components/feedback/AppErrorBoundary";

import { QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./app/queryClient";

import { AuthProvider } from "./features/auth/context/AuthProvider";

import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
