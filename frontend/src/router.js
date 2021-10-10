import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PropertyView from "./components/property/PropertyView";
import Page from "./components/atoms/Page";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

export const paths = [
  {
    path: "/",
    exact: true,
    component: PropertyView,
    name: "Properties",
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    name: "Regsiter",
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    name: "Login",
  },
];

export const managerPaths = [{}];

export const inspectorPaths = [{}];

function Router() {
  // TODO: Implement some condition to switch between different routes
  const activePath = paths;

  return (
    <BrowserRouter>
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
