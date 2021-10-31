import DateTimePicker from "@mui/lab/DateTimePicker";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import API from "../../services/api";
import DraggablePropertyCard from "./DraggablePropertyCard";
import RouteProperties from "./RouteProperties";
import userContext from "../../lib/context";

function Route() {
  const { user } = useContext(userContext);
  const [propertiesToInspect, setPropertiesToInspect] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [userAddress, setUserAddress] = useState(null);
  const [direction, setDirection] = useState(null);
  // Hotfix for direction service spamming API calls
  const [itineraryUpdated, setItineraryUpdated] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API.getMapsKey(),
  });

  const addToItinerary = useCallback((property, duration) => {
    setItineraryUpdated(true);
    setPropertiesToInspect([...propertiesToInspect, { property, duration }]);
  }, [propertiesToInspect, setPropertiesToInspect]);

  const removeFromItinerary = useCallback(
    (index) => {
      const updatedProperties = propertiesToInspect.slice();
      updatedProperties.splice(index, 1);
      setPropertiesToInspect(updatedProperties);
      setItineraryUpdated(true);
    },
    [propertiesToInspect, setPropertiesToInspect]
  );

  const moveProperty = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedProperty = propertiesToInspect[dragIndex];
      const updatedProperties = propertiesToInspect.slice();
      updatedProperties.splice(dragIndex, 1);
      updatedProperties.splice(hoverIndex, 0, draggedProperty);
      setPropertiesToInspect(updatedProperties);
      setItineraryUpdated(true);
    },
    [propertiesToInspect, setPropertiesToInspect]
  );

  const directionsCallback = response => {
    if (response !== null && !!itineraryUpdated) {
      if (response.status === 'OK') {
        setDirection(response);
        setItineraryUpdated(false);
      } else {
        console.log('ERROR:', response);
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await API.getUser(user.token);
      console.log(fetchedUser);
      setUserAddress(
        fetchedUser.address === ""
          ? "UNSW Library, Library, Kensington NSW 2035"
          : fetchedUser.address
      );
    }
    fetchUser();
  }, [user.token]);

  return (
    <>
      {!isLoaded && !userAddress && <CircularProgress />}
      {isLoaded && !!userAddress && (
        <Grid container>
          <Grid item xs={12}>
            <GoogleMap
              id="inspection-route"
              mapContainerStyle={{
                height: "400px",
                width: "100%",
              }}
              zoom={2}
              center={{
                lat: 0,
                lng: -180,
              }}
            >
              {propertiesToInspect.length > 0 && (
                <DirectionsService
                  options={{
                    origin: userAddress,
                    destination: propertiesToInspect[propertiesToInspect.length - 1].property.address,
                    travelMode: "DRIVING",
                    waypoints: propertiesToInspect.slice(0, propertiesToInspect.length - 1).map(p => ({
                      location: p.property.address,
                      stopover: true
                    }))
                  }}
                  callback={directionsCallback}
                />
              )}
              {direction !== null && (
                <DirectionsRenderer
                  options={{
                    directions: direction
                  }}
                />
              )}
            </GoogleMap>
          </Grid>
          <DndProvider backend={HTML5Backend}>
            <Grid item xs={6}>
              <Box mt={2} ml={2}>
                <Typography variant="h3" mb={2}>
                  Itinerary
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e)}
                  />
                </Box>
                <Box
                  mr={4}
                  ml={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "64px 0",
                  }}
                >
                  {propertiesToInspect.map((p, index) => (
                    <DraggablePropertyCard
                      key={p.property.id}
                      property={p.property}
                      duration={p.duration}
                      index={index}
                      moveProperty={moveProperty}
                      remove={() => removeFromItinerary(index)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3" mt={2}>
                Available Properties
              </Typography>
              <RouteProperties onSubmit={addToItinerary} />
            </Grid>
          </DndProvider>
        </Grid>
      )}
    </>
  );
}

export default Route;
