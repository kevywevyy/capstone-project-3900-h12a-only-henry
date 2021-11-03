import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import userContext from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";

const RegisterForm = styled.form`
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  const { setUserContext } = useContext(userContext);

  const register = useCallback(() => {
    return API.register({
      firstName,
      lastName,
      password,
      email,
      address,
      type,
    });
  }, [firstName, lastName, password, email, address, type]);

  const [{ inProgress, error, data }, makeRequest] = useAPI(register);

  useEffect(() => {
    if (data && data.agentId) {
      // Updates state of user by setting a token
      setUserContext({ token: data.agentId });
      history.push("/");
    }
  }, [data, history, setUserContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest();
  };

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <TextField
        required
        label="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={{
          marginTop: "8px",
        }}
      />
      <TextField
        required
        label="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        sx={{
          marginTop: "8px",
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
        required
        label="Address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{
          marginTop: "8px",
        }}
      />
      <TextField
        label="Phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        type="submit"
        sx={{
          marginTop: "8px",
        }}
      >
        {!inProgress ? "Register" : "Loading..."}
      </Button>
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </RegisterForm>
  );
}

export default Register;
