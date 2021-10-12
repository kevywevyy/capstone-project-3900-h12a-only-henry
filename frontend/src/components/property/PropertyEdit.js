import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import API from "../../services/api";
import userContext from "../../lib/context";
import { useParams, useHistory, Redirect } from "react-router-dom";
import useAPI from "../../services/useApi";

function PropertyEdit() {
  const { estateId } = useParams();
  const history = useHistory();
  const { user } = useContext(userContext);
  const [property, setProperty] = useState();

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [address, setAddress] = useState(property.address);
  const [bedrooms, setBedrooms] = useState(property.bedrooms);
  const [bathrooms, setBathrooms] = useState(property.bathrooms);
  const [garages, setGarages] = useState(property.garages);
  const [landSqm, setLandSqm] = useState(property.land_sqm);
  const [price, setPrice] = useState(property.price);

  const fetchProperty = useCallback(async () => {
    return API.getProperty(user.token, estateId);
  }, [user, estateId]);

  const updateProperty = useCallback(async () => {
    // TODO: Add some data validation
    return API.editProperty(user.token, estateId, {
      title,
      description,
      address,
      bedrooms,
      bathrooms,
      garages,
      land_sqm: landSqm,
      price,
    });
  }, [
    title,
    description,
    address,
    bedrooms,
    bathrooms,
    garages,
    landSqm,
    price,
    estateId,
    user,
  ]);

  const [{ inProgress, error, data }, makeAPIRequest] = useAPI(updateProperty);

  useEffect(() => {
    const init = async () => {
      const fetchedProperty = await fetchProperty();
      setProperty(fetchedProperty);
    };
    init();
  }, [fetchProperty]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        "> div:not(:first-of-type)": {
          marginTop: "16px",
        },
      }}
    >
      <TextField
        required
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        multiline
        rows={4}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        required
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Box
        sx={{
          "> div:not(:first-of-type)": {
            marginLeft: "16px",
          },
        }}
      >
        <TextField
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          type="number"
          label="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <TextField
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          type="number"
          label="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <TextField
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          type="number"
          label="Garages"
          value={garages}
          onChange={(e) => setGarages(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          "> div:not(:first-of-type)": {
            marginLeft: "16px",
          },
        }}
      >
        <TextField
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          type="number"
          label="Price"
          helperText="per week"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            endAdornment: <InputAdornment position="end">sq m</InputAdornment>,
          }}
          type="number"
          label="Land"
          helperText=" "
          value={landSqm}
          onChange={(e) => setLandSqm(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        <Button color="secondary" variant="outlined" onClick={makeAPIRequest}>
          {!inProgress ? "Save" : <CircularProgress />}
        </Button>
        <Button
          color="secondary"
          onClick={() => history.push(`/property/${estateId}`)}
          sx={{
            marginLeft: "8px",
          }}
        >
          Cancel
        </Button>
      </Box>
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
      {!inProgress && !error && !!data && (
        <Redirect to={`property/${estateId}`} />
      )}
    </Box>
  );
}

export default PropertyEdit;
