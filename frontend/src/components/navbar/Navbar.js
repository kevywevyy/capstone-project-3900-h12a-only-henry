import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  NAVBAR_HEIGHT,
  ROLE_GUEST,
  ROLE_MANAGER,
  USER_KEY,
  SUBNAV_HEIGHT,
} from "../../const";
import { Grid, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import userContext from "../../lib/context";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

  height: ${NAVBAR_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: black;
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

  height: ${SUBNAV_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: gray;
`;

function Navbar({ role, path }) {
  const history = useHistory();
  const { setUserContext } = useContext(userContext);
  const [currentRoute, setCurrentRoute] = useState(history.location.pathname);

  const isLoginPage = role === ROLE_GUEST && currentRoute === "/";
  const isRegisterPage = role === ROLE_GUEST && currentRoute === "/register";

  const isPropertyViewPage = role === ROLE_MANAGER && currentRoute === "/";

  history.listen((h) => {
    setCurrentRoute(h.pathname);
  });

  const logOut = () => {
    setUserContext({ token: null });
    localStorage.removeItem(USER_KEY);
    history.push("/");
  };

  const getSubheading = () => {
    for (const route of path) {
      if (route.path === currentRoute) {
        return route.name;
      }
    }
    return "Error: Pathname not found";
  };

  return (
    <div style={{ position: "sticky" }}>
      <Nav>
        <Typography variant="h3">RIS</Typography>
        <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
          {isLoginPage && (
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <Button onClick={() => history.push("/register")}>
                Don't have an account? Register here
              </Button>
            </Grid>
          )}
          {isRegisterPage && (
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <Button onClick={() => history.push("/")}>Sign In</Button>
            </Grid>
          )}
          {isPropertyViewPage && (
            <Grid item xs={3} sx={{ textAlign: "end" }} onClick={logOut}>
              <Button>Sign Out</Button>
            </Grid>
          )}
        </Grid>
      </Nav>
      <SubNav>
        <Typography variant="h5">{getSubheading()}</Typography>
      </SubNav>
    </div>
  );
}

export default Navbar;
