import apiClient from "../../../api/clientApi";

export const getPollResults = async (pollId) => {
  const response = await apiClient.get(`/polls/${pollId}/results`);

  return response.data;
};
