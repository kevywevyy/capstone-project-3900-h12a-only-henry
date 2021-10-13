import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import userContext from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserContext } = useContext(userContext);
  const history = useHistory();

  // TODO: Uncomment once backend has support logging in
  // const login = useCallback(() => {
  //   return API.login({
  //     email,
  //     password,
  //   });
  // }, [email, password]);

  // const [{ inProgress, error, data }, makeRequest] = useAPI(login);

  // useEffect(() => {
  //   if (data && data.token) {
  //     // Updates state of user by setting a token
  //     setUserContext({ token: data.token });
  //     history.push("/");
  //   }
  // }, [data, history, setUserContext]);

  const stubLogin = () => {
    setUserContext({ token: email });
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    stubLogin();
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <TextField
        required
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <Button type="submit" sx={{ marginTop: "8px" }}>
        {/* {!inProgress ? "Login" : "Loading..."} */}
        Login
      </Button>
      {/* {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>} */}
    </LoginForm>
  );
}

export default Login;
