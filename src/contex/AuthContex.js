import { createContext, useContext, useEffect, useState } from "react";
import { localStorageUtil } from "../utils/localStorage";
import axiosInstance from "../axios";

const AuthContex = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorageUtil.getAccessToken();
    if (accessToken) {
      setIsAuth(true);
      // fetch user data
      axiosInstance
        .get("/api/v1/account/me/") // or /users/me depending on backend
        .then((res) => {
          setUserData(res.data);
        })
        .catch(() => {
          // token might be invalid or expired and refresh failed
          localStorageUtil.removeTokens();
          setIsAuth(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAuth(false);
      setLoading(false);
    }
  }, []);

  const loginUser = (user, access, refresh) => {
    setUserData(user);
    localStorageUtil.updateTokens(access, refresh);
    setIsAuth(true);
  };

  const logOut = () => {
    localStorageUtil.removeTokens();
    setUserData(null);
    setIsAuth(false);
  };

  const authContexValues = {
    isAuth,
    userData,
    setUserData,
    loginUser,
    logOut,
    loading,
  };
  return (
    <AuthContex.Provider value={authContexValues}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
