import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import PropertyView from "./components/property/PropertyView";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import userContext from "./lib/context";
import {
  NAVBAR_HEIGHT,
  ROLE_MANAGER,
  ROLE_GUEST,
  SUBNAV_HEIGHT,
} from "./const";
import Navbar from "./components/navbar/Navbar";

const Page = styled.div`
  width: 100vw;
  height: calc(100vh - ${NAVBAR_HEIGHT}px - ${SUBNAV_HEIGHT}px);
`;

export const paths = [
  {
    path: "/",
    exact: true,
    component: Login,
    name: "Login",
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    name: "Register",
  },
];

export const managerPaths = [
  {
    path: "/",
    exact: true,
    component: PropertyView,
    name: "Properties",
  },
];

export const inspectorPaths = [{}];

function Router() {
  const { user } = useContext(userContext);

  // TODO: Implement some condition to switch between different routes
  const activePath = !user.token ? paths : managerPaths;

  return (
    <BrowserRouter>
      <Navbar
        role={!!user.token ? ROLE_MANAGER : ROLE_GUEST}
        path={activePath}
      />
      <Page>
        <Switch>
          {activePath.map((p, i) => (
            <Route
              path={p.path}
              exact={p.exact}
              component={p.component}
              key={`ris-path-${i}`}
            />
          ))}
          <Redirect to="/" />
        </Switch>
      </Page>
    </BrowserRouter>
  );
}

export default Router;
