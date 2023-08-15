// Create a context that will allow child components to be aware of the authentication status.
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  dataLoaded: { navBar: false, feed: false },
  setDataLoaded: () => {},
});
