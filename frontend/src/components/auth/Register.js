import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import userContext from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const userTypes = [
  {
    value: "MANAGER",
    label: "Property Manager",
  },
  {
    value: "INSPECTOR",
    label: "Property Inspector",
  },
];

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  const { setUserContext } = useContext(userContext);

  const register = useCallback(() => {
    return API.register({
      username,
      password,
      email,
      type,
    });
  }, [username, password, email, type]);

  const [{ inProgress, error, data }, makeRequest] = useAPI(register);

  useEffect(() => {
    if (data && data.token) {
      // Updates state of user by setting a token
      setUserContext({ token: data.token });
      history.push("/");
    }
  }, [data, history, setUserContext]);

  return (
    <RegisterForm>
      <Typography variant="h6">Register</Typography>
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
      <TextField
        required
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          marginTop: "8px",
        }}
      />
      <TextField
        select
        required
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{
          marginTop: "16px",
        }}
        helperText="Please select what type of user you are"
      >
        {userTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        onClick={makeRequest}
        sx={{
          marginTop: "8px",
        }}
      >
        {!inProgress ? "Register" : "Loading..."}
      </Button>
      <Button
        onClick={() => history.push("/login")}
        sx={{
          marginTop: "8px",
        }}
      >
        Already have an account? Login here
      </Button>
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </RegisterForm>
  );
}

export default Register;
