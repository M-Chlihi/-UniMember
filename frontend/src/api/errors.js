export const getApiError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,

      message:
        error.response.data?.message || getStatusMessage(error.response.status),
    };
  }

  if (error.request) {
    return {
      status: null,
      message:
        "Unable to reach the server. Check your connection and try again.",
    };
  }

  return {
    status: null,
    message: error.message || "Unexpected error occurred.",
  };
};

const getStatusMessage = (status) => {
  switch (status) {
    case 400:
      return "The submitted information is invalid.";

    case 401:
      return "Your session is not authorized.";

    case 403:
      return "You do not have permission to perform this action.";

    case 404:
      return "The requested resource was not found.";

    case 409:
      return "This request conflicts with the current state.";

    case 429:
      return "Too many requests. Please try again later.";

    default:
      if (status >= 500) {
        return "A server error occurred. Please try again later.";
      }

      return "Request failed.";
  }
};
