import apiClient from "../../../api/clientApi";

export const register = async (payload) => {
  const response = await apiClient.post("/auth/register", payload);

  return response.data;
};

export const login = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);

  return response.data;
};

export const refresh = async () => {
  const response = await apiClient.post("/auth/refresh");

  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");

  return response.data;
};
