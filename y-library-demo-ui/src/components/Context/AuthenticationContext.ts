import { createContext } from "react";

const AuthenticationContext = createContext({
  isAuthenticated: false,
  authenticate: async (username: string, password: string): Promise<boolean> =>
    false,
  logout: () => {},
});

export default AuthenticationContext;
