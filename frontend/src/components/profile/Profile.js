import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Profile() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h3">Property Preferences</Typography>
      <TextField
        type="name"
        label="Profile"
        sx={{
          marginTop: "16px",
        }}
      />
    </Box>
  );
}

export default Profile;
