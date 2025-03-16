import { useState } from "react";
import useFetch from "./useFetch";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleFetch = useFetch("https://localhost:7133/", "user");

  const authenticate = (username: string, password: string): boolean => {
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
