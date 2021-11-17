import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import qs from "qs";
import API from "../../services/api";
import useAPI from "../../services/useApi";
import PropertyCard from "./PropertyCard";
import _ from "lodash";
import userContext from "../../lib/context";

function PropertyViewInspector() {
  const [properties, setProperties] = useState(null);
  const [options, setOptions] = useState({});
  const { user } = useContext(userContext);
  const optionNumbers = [-1, 1, 2, 3, 4, 5, 6];

  const fetchAllProperties = (params) => {
    return API.getAllInspectorProperties(
      user.token,
      qs.stringify(_.pickBy(params, (value, key) => value !== -1))
    );
  };

  const [{ inProgress, error, data }, makeAPIRequest] =
    useAPI(fetchAllProperties);

  useEffect(() => {
    if (!inProgress && !error && !data) {
      makeAPIRequest();
    }
  }, [inProgress, error, data, makeAPIRequest]);

  useEffect(() => {
    if (!inProgress && !error && !!data) {
      setProperties(data);
    }
  }, [inProgress, error, data]);

  const updateOptions = useCallback(
    (field) => {
      setOptions({ ...options, ...field });
      makeAPIRequest({ ...options, ...field });
    },
    [options, setOptions, makeAPIRequest]
  );

  return (
    <Box padding={2}>
      {inProgress && <CircularProgress />}
      {!inProgress && !!properties && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Filter By</Typography>
            <TextField
              select
              value={options.bedrooms || -1}
              label="Bedrooms"
              onChange={(e) =>
                updateOptions({ bedrooms: parseInt(e.target.value) })
              }
              sx={{
                width: "150px",
                marginLeft: "16px",
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
              onChange={(e) =>
                updateOptions({ bathrooms: parseInt(e.target.value) })
              }
              sx={{
                width: "150px",
                marginLeft: "16px",
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
              onChange={(e) =>
                updateOptions({ garages: parseInt(e.target.value) })
              }
              sx={{
                width: "150px",
                marginLeft: "16px",
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
          </Box>
          <Typography variant="h3" mt={2}>
            Properties selected for you
          </Typography>
          {properties.length === 0 && (
            <Typography mt={2}>
              No properties at this moment, please check back later.
            </Typography>
          )}
          {properties.map((p) => (
            <PropertyCard key={`property-${p.id}`} property={p} />
          ))}
        </Box>
      )}
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </Box>
  );
}

export default PropertyViewInspector;
