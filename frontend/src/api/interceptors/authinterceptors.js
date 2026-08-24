import { getAccessToken } from "../../features/auth/utils/tokenStore";

export const attachAccessToken = (config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
