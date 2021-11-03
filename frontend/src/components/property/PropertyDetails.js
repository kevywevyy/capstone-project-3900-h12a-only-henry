import React, { useCallback, useContext, useEffect, useState } from "react";
import useAPI from "../../services/useApi";
import { useParams, useHistory } from "react-router-dom";
import API from "../../services/api";
import userContext from "../../lib/context";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  CardMedia,
  Typography,
  Grid,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { PropertyFeaturesComponent } from "./PropertyCard";
import HousePlaceholder from "../../assets/house-placeholder.jpg";
import { format } from "date-fns";

function PropertyDetails() {
  const { estateId } = useParams();
  const history = useHistory();
  const { user } = useContext(userContext);
  const [property, setProperty] = useState(null);

  const fetchProperty = useCallback(() => {
    return API.getProperty(user.token, estateId);
  }, [user, estateId]);

  const [{ inProgress, error, data }, makeAPIRequest] = useAPI(fetchProperty);

  useEffect(() => {
    if (!inProgress && !error && !data) {
      makeAPIRequest();
    }
  }, [makeAPIRequest, inProgress, data, error]);

  useEffect(() => {
    if (!inProgress && !error && !!data) {
      setProperty(data);
    }
  }, [inProgress, error, data]);

  const closeProperty = useCallback(async () => {
    await API.closeProperty(user.token, estateId);
    makeAPIRequest();
  }, [user, estateId, makeAPIRequest]);

  const openProperty = useCallback(async () => {
    await API.openProperty(user.token, estateId);
    makeAPIRequest();
  }, [user, estateId, makeAPIRequest]);

  const removeInspectionTimes = useCallback(
    async (inspectionId) => {
      await API.removeInspectionTimes(user.token, estateId, inspectionId);
      makeAPIRequest();
    },
    [user, estateId, makeAPIRequest]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "32px" }}>
      {inProgress && <CircularProgress />}
      {!inProgress && !!property && (
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {property.open && (
                <Typography variant="subtitle1" sx={{ color: "success.main" }}>
                  OPEN
                </Typography>
              )}
              {!property.open && (
                <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                  CLOSED
                </Typography>
              )}
              <Typography variant="h2">{property.address}</Typography>
              <PropertyFeaturesComponent
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                garages={property.garages}
                property_type={property.property_type}
              />
              <Typography
                variant="body"
                sx={{ marginTop: "8px" }}
              >{`$${property.price} per week`}</Typography>
              <Typography variant="body" sx={{ marginTop: "8px" }}>
                {`${property.land_sqm} sq m`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "16px",
                }}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => history.push(`/property/${estateId}/edit`)}
                >
                  <EditIcon />
                  Edit
                </Button>
                {property.open && (
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={closeProperty}
                    sx={{ marginLeft: "16px" }}
                  >
                    <CloseIcon />
                    Close
                  </Button>
                )}
                {!property.open && (
                  <Button
                    variant="outlined"
                    onClick={openProperty}
                    sx={{ marginLeft: "16px" }}
                  >
                    <HomeIcon />
                    Open
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              sx={{ width: "100%" }}
              image={property.images || HousePlaceholder}
              alt="House Pic"
            />
          </Grid>
          <Divider sx={{ width: "100%", margin: "16px 0" }} />
          <Box sx={{ margin: "0 32px" }}>
            <Typography variant="h2">{property.title}</Typography>
            <Typography variant="body1" sx={{ marginTop: "16px" }}>
              {property.description}
            </Typography>
            <Typography variant="h3" mt={4}>
              Inspection Times
            </Typography>
            {property.inspection_dates.length === 0 && (
              <Typography mt={2} variant="subtitle1" color="error.main">
                No inspection times listed
              </Typography>
            )}
            {property.inspection_dates.map(
              ({ inspectionId, start_date, end_date }) => (
                <Box
                  key={`inspection-id-${inspectionId}`}
                  mt={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">{`${format(
                    new Date(start_date),
                    "PPpp"
                  )} - ${format(new Date(end_date), "PPpp")}`}</Typography>
                  <Button
                    onClick={() => removeInspectionTimes(inspectionId)}
                    sx={{ marginLeft: "16px", color: "error.main" }}
                  >
                    Remove
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default PropertyDetails;
