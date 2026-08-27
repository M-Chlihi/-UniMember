import apiClient from "../../../../api/clientApi";

export const getAdminPolls = async (params = {}) => {
  const response = await apiClient.get("/polls", { params });

  return response.data;
};

export const getAdminPoll = async (pollId) => {
  const response = await apiClient.get(`/polls/${pollId}`);

  return response.data;
};

export const createPoll = async (payload) => {
  const response = await apiClient.post("/polls", payload);
  console.log(response.data);
  return response.data;
};

export const updatePoll = async (pollId, payload) => {
  const response = await apiClient.patch(`/polls/${pollId}`, payload);

  return response.data;
};

export const publishPoll = async (pollId) => {
  const response = await apiClient.post(`/polls/${pollId}/publish`);

  return response.data;
};

export const cancelPoll = async (pollId) => {
  const response = await apiClient.post(`/polls/${pollId}/cancel`);

  return response.data;
};

export const deleteDraftPoll = async (pollId) => {
  const response = await apiClient.delete(`/polls/${pollId}/delete`);
  console.log(response);
  console.log(response.data);
  return response.data;
};

export const createPollOption = async (pollId, payload) => {
  const response = await apiClient.post(`/polls/${pollId}/options`, payload);

  return response.data;
};
