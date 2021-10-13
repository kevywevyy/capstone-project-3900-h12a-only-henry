import React from "react";
import userContext, { useUserContext } from "./lib/context";
import Router from "./router";

function App() {
  // Handles user information
  const [user, setUserContext] = useUserContext();

  return (
    <userContext.Provider value={{ user, setUserContext }}>
      <Router />
    </userContext.Provider>
  );
}

export default App;
