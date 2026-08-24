import apiClient from "../../../api/clientApi";

export const getNotifications = async (params = {}) => {
  const response = await apiClient.get("/notifications", { params });
  return response.data;
};

export const getNotification = async (notificationId) => {
  const response = await apiClient.get(`/notifications/${notificationId}`);

  return response.data;
};
