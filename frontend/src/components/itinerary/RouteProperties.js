import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useContext, useEffect, useState } from "react";
import userContext from "../../lib/context";
import API from "../../services/api";
import useAPI from "../../services/useApi";
import PropertyCard from "../property/PropertyCard";

function RouteProperties({ onSubmit }) {
  const { user } = useContext(userContext);
  const [open, setOpen] = useState(null);
  const [properties, setProperties] = useState([]);
  const [duration, setDuration] = useState(0);

  const fetchAllProperties = useCallback(() => {
    return API.getAllProperties(user.token);
  }, [user]);

  const [{ inProgress, error, data }, makeAPIRequest] =
    useAPI(fetchAllProperties);

  useEffect(() => {
    if (!inProgress && !error && !data) {
      makeAPIRequest();
    }
  }, [inProgress, makeAPIRequest, data]);

  useEffect(() => {
    if (!inProgress && !error && !!data) {
      setProperties(data);
    }
  }, [inProgress, error, data]);

  const openProperties = properties.filter((p) => p.open);

  const handleSubmit = () => {
    onSubmit(open, parseInt(duration));
    setOpen(false);
  };

  return (
    <Box mr={4}>
      {!!open && (
        <Dialog open={!!open} onClose={() => setOpen(null)}>
          <DialogTitle>Set Duration for Inspection</DialogTitle>
          <DialogTitle
            sx={{ paddingTop: "0px" }}
          >{`@ ${open.address}`}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Set how long the inspection will last (minutes)
            </DialogContentText>
            <TextField
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              sx={{
                marginTop: "16px",
              }}
            />
          </DialogContent>
          <Button onClick={handleSubmit}>Add to Itinerary</Button>
        </Dialog>
      )}
      {inProgress && <CircularProgress />}
      {!inProgress && !!properties.length && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {openProperties.map((p) => (
              <Box
                key={p.id}
                sx={{
                  display: "flex",
                }}
              >
                <PropertyCard key={p.id} property={p} />
                <Button onClick={() => setOpen(p)}>
                  <AddIcon />
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RouteProperties;
