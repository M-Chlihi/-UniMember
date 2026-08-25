import apiClient from "../../../api/clientApi";

export const getNotifications = async (params = {}) => {
  const response = await apiClient.get("/notifications", { params });

  console.log("AXIOS NOTIFICATION RESPONSE:", response);

  console.log("AXIOS NOTIFICATION DATA:", response.data);
  return response.data;
};

export const getNotification = async (notificationId) => {
  const response = await apiClient.get(`/notifications/${notificationId}`);

  return response.data;
};
