import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

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

  // Logs in the user
  const handleClick = () => {};

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
      <Button
        onClick={handleClick}
        sx={{
          marginTop: "8px",
        }}
      >
        Login
      </Button>
    </LoginForm>
  );
}

export default Login;
