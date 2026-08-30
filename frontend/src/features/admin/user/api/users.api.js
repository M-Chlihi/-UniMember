import apiClient from "../../../../api/clientApi";

export const getUsers = async (params = {}) => {
  const response = await apiClient.get("/users", {
    params,
  });

  return response.data;
};

export const updateUserRoles = async ({ userId, roles }) => {
  const response = await apiClient.patch(`/users/${userId}/roles`, {
    roles,
  });

  return response.data;
};
