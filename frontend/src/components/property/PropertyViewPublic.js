import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import API from "../../services/api";
import useAPI from "../../services/useApi";
import PropertyCard from "./PropertyCard";

function PropertyViewPublic() {
  const [properties, setProperties] = useState(null);

  const fetchAllProperties = useCallback(() => {
    return API.getAllProperties();
  }, []);

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

  return (
    <Box padding={2}>
      {inProgress && <CircularProgress />}
      {!inProgress && !!properties && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Available Properties</Typography>
          {properties.map((p) => (
            <PropertyCard property={p} />
          ))}
        </Box>
      )}
      {!!error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </Box>
  );
}

export default PropertyViewPublic;
