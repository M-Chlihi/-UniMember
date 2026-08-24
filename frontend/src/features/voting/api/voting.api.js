import apiClient from "../../../api/clientApi";

export const castVote = async (pollId, optionId) => {
  const response = await apiClient.post(`/polls/${pollId}/votes`, { optionId });

  return response.data;
};

export const getMyVote = async (pollId) => {
  const response = await apiClient.get(`/polls/${pollId}/my-vote`);

  return response.data;
};

export const getVotingHistory = async (params = {}) => {
  const response = await apiClient.get("/polls/history", { params });

  return response.data;
};
