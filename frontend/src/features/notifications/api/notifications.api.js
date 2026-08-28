import apiClient from "../../../api/clientApi";

export const getNotifications = async (params = {}) => {
  const response = await apiClient.get("/notifications", { params });

  return response.data;
};

export const getNotification = async (notificationId) => {
  const response = await apiClient.get(`/notifications/${notificationId}`);

  return response.data;
};

export const getNotificationSummary = async (params = {}) => {
  const response = await apiClient.get("/notifications/summary", { params });
  console.log(response);
  console.log(response.data);
  return response.data;
};

export const getNotificationHistory = async (params = {}) => {
  const response = await apiClient.get("/notifications/history", { params });

  return response.data;
};
