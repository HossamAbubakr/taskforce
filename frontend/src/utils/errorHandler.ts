export const handleAuthError = (error: any) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      return { type: "auth", message: "Session expired. Please log in again." };
    } else {
      return { type: "other", message: "An error occurred. Please try again." };
    }
  } else if (error.request) {
    return {
      type: "network",
      message: "Network error. Please check your connection.",
    };
  } else {
    return { type: "other", message: "An unexpected error occurred." };
  }
};
