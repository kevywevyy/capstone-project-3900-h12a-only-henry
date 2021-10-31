import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import DateTimePicker from "react-datetime-picker";
import API from "../../services/api";
import DraggablePropertyCard from "./DraggablePropertyCard";
import RouteProperties from "./RouteProperties";

function Route() {
  const [propertiesToInspect, setPropertiesToInspect] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API.getMapsKey(),
  });

  const addToItinerary = (property, duration) => {
    setPropertiesToInspect([...propertiesToInspect, { property, duration }]);
  };

  const moveProperty = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedProperty = propertiesToInspect[dragIndex];
      const updatedProperties = propertiesToInspect.slice();
      updatedProperties.splice(dragIndex, 1);
      updatedProperties.splice(hoverIndex, 0, draggedProperty);
      setPropertiesToInspect(updatedProperties);
    },
    [propertiesToInspect, setPropertiesToInspect]
  );

  return (
    <>
      {!isLoaded && <CircularProgress />}
      {isLoaded && (
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
            ></GoogleMap>
          </Grid>
          <DndProvider backend={HTML5Backend}>
            <Grid item xs={6}>
              <Typography variant="h3" mt={2} ml={2}>
                Itinerary
              </Typography>
              <Box
                mr={4}
                ml={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {propertiesToInspect.map((p, index) => (
                  <DraggablePropertyCard
                    property={p.property}
                    duration={p.duration}
                    index={index}
                    moveProperty={moveProperty}
                  />
                ))}
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
