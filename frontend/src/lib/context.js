import { createContext, useState } from "react";
import API from "../services/api";

const USER_KEY = "USER";

const userContext = createContext({
  user: { token: "" },
  setUserContext: () => {},
});

// Hook function to update context within components
export function useUserContext() {
  const storedUser = JSON.parse(localStorage.getItem(USER_KEY));
  const [user, setUser] = useState({
    token: storedUser?.token ? storedUser.token : null,
  });

  if (user.token) API.setToken(user.token);

  function setUserContext(updatedUser) {
    if (updatedUser.token) API.setToken(updatedUser.token);
    setUser({ ...user, ...updatedUser });
    localStorage.setItem(USER_KEY, JSON.stringify({ ...user, ...updatedUser }));
  }

  return [user, setUserContext];
}

export default userContext;
