import { useState } from "react";
import useFetch from "./useFetch";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleFetch = useFetch("https://localhost:7133/", "user");

  const authenticate = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const queryObj = {
      username: `${username}`,
      password: `${password}`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObj),
    };

    let success = false;

    await handleFetch(undefined, options)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res.statusText);
        else success = true;
      })
      .catch((err) => {
        console.log(err);
      });
    if (success) {
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
