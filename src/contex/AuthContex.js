import { createContext, useContext, useEffect, useState } from "react";
import { localStorageUtil } from "../utils/localStorage";

const AuthContex = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorageUtil.getAccessToken();
    accessToken ? setIsAuth(true) : setIsAuth(false);
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

  const authContexValues = { isAuth, userData, setUserData, loginUser, logOut };
  return (
    <AuthContex.Provider value={authContexValues}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
