import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  NAVBAR_HEIGHT,
  ROLE_GUEST,
  ROLE_MANAGER,
  USER_KEY,
  SUBNAV_HEIGHT,
} from "../../const";
import { Grid, Button, Typography, useTheme } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import userContext from "../../lib/context";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  height: ${NAVBAR_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: ${(props) => props.theme.palette.primary.dark};
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  height: ${SUBNAV_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

function Navbar({ role, path }) {
  const history = useHistory();
  const theme = useTheme();
  const { setUserContext } = useContext(userContext);
  const [currentRoute, setCurrentRoute] = useState(history.location.pathname);

  const isLoginPage = role === ROLE_GUEST && currentRoute === "/";
  const isRegisterPage = role === ROLE_GUEST && currentRoute === "/register";

  const isPropertyManager = role === ROLE_MANAGER;
  const isPropertyViewPage = role === ROLE_MANAGER && currentRoute === "/";

  const { path: matched } = useRouteMatch();

  const logOut = () => {
    setUserContext({ token: null });
    localStorage.removeItem(USER_KEY);
    history.push("/");
  };

  const getSubheading = () => {
    for (const route of path) {
      if (route.path === matched) {
        return route.name;
      }
    }
    return "Error: Pathname not found";
  };

  useEffect(() => {
    setCurrentRoute(history.location.pathname);
  }, [history]);

  return (
    <>
      <Nav theme={theme}>
        <Typography variant="h3">RIS</Typography>
        <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
          {isLoginPage && (
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <Button
                variant="filled"
                onClick={() => history.push("/register")}
              >
                Don't have an account? Register here
              </Button>
            </Grid>
          )}
          {isRegisterPage && (
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <Button variant="filled" onClick={() => history.push("/")}>
                Sign In
              </Button>
            </Grid>
          )}
          {isPropertyManager && (
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              <Button
                variant="filled"
                disabled={isPropertyViewPage}
                onClick={() => history.push("/")}
              >
                Properties
              </Button>
            </Grid>
          )}
          {isPropertyManager && (
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              <Button variant="filled" onClick={logOut}>
                Sign Out
              </Button>
            </Grid>
          )}
        </Grid>
      </Nav>
      <SubNav theme={theme}>
        <Typography variant="h6">{getSubheading()}</Typography>
      </SubNav>
    </>
  );
}

export default Navbar;
