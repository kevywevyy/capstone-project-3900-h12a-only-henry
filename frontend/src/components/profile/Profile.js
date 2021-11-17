import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import userContext from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";
import { getUserId } from "../../lib/helper";

function Profile() {
  const { user } = useContext(userContext);
  const inspectorId = getUserId(user.token);
  const [options, setOptions] = useState({});
  const optionNumbers = [-1, 1, 2, 3, 4, 5, 6];
  const history = useHistory();

  const updateProfile = useCallback(() => {
    return API.updateUserProfile(inspectorId, {
      bedrooms: options.bedrooms === -1 ? null : options.bedrooms,
      bathrooms: options.bathrooms === -1 ? null : options.bathrooms,
      garages: options.garages === -1 ? null : options.garages,
    });
  }, [inspectorId, options]);

  const [{ inProgress, error, data }, makeAPIRequest] = useAPI(updateProfile);

  const updateOptions = useCallback(
    (field) => {
      setOptions({ ...options, ...field });
    },
    [options, setOptions]
  );

  useEffect(() => {
    if (!inProgress && !error && !data) {
      makeAPIRequest();
    }
  }, [inProgress, error, data, makeAPIRequest]);

  useEffect(() => {
    if (!inProgress && !error && !!data) {
      history.push("/");
    }
  }, [inProgress, error, data, history]);

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
        select
        value={options.bedrooms || -1}
        label="Bedrooms"
        onChange={(e) => updateOptions({ bedrooms: parseInt(e.target.value) })}
        sx={{
          width: "150px",
          marginTop: "16px",
        }}
      >
        {optionNumbers.map((o) => (
          <MenuItem key={`bedroom-options-${o}`} value={o}>
            {o === -1 && "Any"}
            {o === 1 && "1 Bedroom"}
            {o === 6 && ">5 Bedrooms"}
            {o > 1 && o < 6 && `${o} Bedrooms`}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        value={options.bathrooms || -1}
        label="Bathrooms"
        onChange={(e) => updateOptions({ bathrooms: parseInt(e.target.value) })}
        sx={{
          width: "150px",
          marginTop: "16px",
        }}
      >
        {optionNumbers.map((o) => (
          <MenuItem key={`bathrooms-options-${o}`} value={o}>
            {o === -1 && "Any"}
            {o === 1 && "1 Bathroom"}
            {o === 6 && ">5 Bathrooms"}
            {o > 1 && o < 6 && `${o} Bathrooms`}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        value={options.garages || -1}
        label="Garages"
        onChange={(e) => updateOptions({ garages: parseInt(e.target.value) })}
        sx={{
          width: "150px",
          marginTop: "16px",
        }}
      >
        {optionNumbers.map((o) => (
          <MenuItem key={`garages-options-${o}`} value={o}>
            {o === -1 && "Any"}
            {o === 1 && "1 Garage"}
            {o === 6 && ">5 Garages"}
            {o > 1 && o < 6 && `${o} Garages`}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="outlined" sx={{ marginTop: "16px" }}>
        Save
      </Button>
    </Box>
  );
}

export default Profile;
