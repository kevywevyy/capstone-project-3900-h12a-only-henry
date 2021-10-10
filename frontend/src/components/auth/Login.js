import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import userContext, { useUserContext } from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserContext } = useUserContext(userContext);
  const history = useHistory();

  const login = useCallback(() => {
    return API.login({
      username,
      password,
    });
  }, [username, password]);

  const [{ inProgress, error, data }, makeRequest] = useAPI(login);

  useEffect(() => {
    if (data && data.token) {
      // Updates state of user by setting a token
      setUserContext({ token: data.token });
      history.push("/");
    }
  }, [data, history, setUserContext]);

  return (
    <LoginForm>
      <Typography variant="h2">Rental Inspection System</Typography>
      <TextField
        required
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          marginTop: "16px",
        }}
      />
      <TextField
        required
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          marginTop: "8px",
        }}
      />
      <Button onClick={makeRequest}>
        {!inProgress ? "Login" : "Loading..."}
      </Button>
      <Button onClick={() => history.push("/register")}>
        Don't have an account? Register here
      </Button>
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </LoginForm>
  );
}

export default Login;
