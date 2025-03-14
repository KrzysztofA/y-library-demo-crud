import { useState } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const authenticate = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(() => true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(() => false);
  };

  return { isAuthenticated, authenticate, logout };
};

export default useAuthentication;
