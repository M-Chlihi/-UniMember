export const getApiError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || "Request failed",
    };
  }

  if (error.request) {
    return {
      status: null,
      message: "Unable to reach the server.",
    };
  }

  return {
    status: null,
    message: error.message || "Unexpected error",
  };
};
