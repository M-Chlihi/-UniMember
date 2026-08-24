import axios from "axios";

import { refresh } from "../../features/auth/api/auth.api";

import {
  clearAccessToken,
  setAccessToken,
} from "../../features/auth/utils/tokenStore";

let refreshPromise = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((data) => {
        setAccessToken(data.accessToken);

        return data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const createAuthRefreshInterceptor = (apiClient) => {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      const status = error.response?.status;

      // Only handle 401
      if (status !== 401) {
        return Promise.reject(error);
      }

      // Never retry the refresh endpoint itself
      if (originalRequest?.url?.includes("/auth/refresh")) {
        clearAccessToken();

        return Promise.reject(error);
      }

      // Prevent infinite retry loops
      if (originalRequest._retry) {
        clearAccessToken();

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const data = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        clearAccessToken();

        return Promise.reject(refreshError);
      }
    },
  );
};
