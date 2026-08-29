import apiClient from "../../../api/clientApi";

export const getActivePoll = () => apiClient.get("/polls/active");

export const getOpenPolls = () => apiClient.get("/polls/open");

export const getPoll = async (pollId) => {
  const response = await apiClient.get(`/polls/${pollId}`);

  return response.data;
};
export const getPolls = (params) =>
  apiClient.get("/polls", {
    params,
  });

export const getPollHistory = (params) =>
  apiClient.get("/polls/history", {
    params,
  });
