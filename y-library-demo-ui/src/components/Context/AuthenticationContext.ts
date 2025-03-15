import { createContext } from "react";

const AuthenticationContext = createContext({
  isAuthenticated: false,
  authenticate: (username: string, password: string): boolean => false,
  logout: () => {},
});

export default AuthenticationContext;
