export const localStorageUtil = {
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  removeTokens: () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  },
  updateTokens: (access, refresh) => {
    if (access) localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  },
  getOtpToken: () => {
    return localStorage.getItem("otpToken");
  },
  setOtpToken: (token) => {
    localStorage.setItem("otpToken", token);
  },
  removeOtpToken: () => {
    localStorage.removeItem("otpToken");
  },
};
