import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Button, Box } from "@mui/material";
import styled from "styled-components";
import PropertyCard from "./PropertyCard";
import { useHistory } from "react-router-dom";

const PropertyViewContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 16px;
`;

function PropertyView() {
  const history = useHistory();

  const estateStub = {
    title: "Amazing home in a lush neighborhood",
    property_type: "house",
    bedrooms: 3,
    bathrooms: 1,
    garages: 1,
    address: "30 Bristol Road, Hurstville",
    land_sqm: "300",
    price: 1000,
    images:
      "https://image.shutterstock.com/image-photo/blue-tiny-house-wooden-porch-600w-1639433239.jpg",
    open: true,
  };

  return (
    <PropertyViewContainer>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Open Properties</Typography>
        <Button
          onClick={() => history.push("/property/add")}
          sx={{
            marginLeft: "8px",
          }}
        >
          <AddIcon />
          Add
        </Button>
      </Box>
      <PropertyCard estate={estateStub} />
      <PropertyCard estate={estateStub} />
      <PropertyCard estate={estateStub} />
      <PropertyCard estate={estateStub} />
      <Typography variant="h4" sx={{ marginTop: "32px" }}>
        Closed Properties
      </Typography>
      <PropertyCard estate={estateStub} />
      <PropertyCard estate={estateStub} />
    </PropertyViewContainer>
  );
}

export default PropertyView;
