export const localStorageUtil = {
  getAccessToken: () => {
    localStorage.getItem("accessToken");
  },
  getRefreshToken: () => {
    localStorage.getItem("refreshToken");
  },
  removeTokens: () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  },
  updateTokens: (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  },
};
