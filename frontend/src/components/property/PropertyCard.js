import React from "react";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import GarageIcon from "@mui/icons-material/Garage";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";
import styled from "styled-components";

const PropertyFeatures = styled.div`
  display: flex;
  align-items: center;
`;

const PropertyFeaturesContainer = styled.div`
  display: flex;

  div:not(:first-child) {
    margin-left: 8px;
  }
`;

function Features({ num, icon }) {
  return (
    <PropertyFeatures>
      <Typography variant="caption">{num}</Typography>
      {icon}
    </PropertyFeatures>
  );
}

function PropertyCard({ estate }) {
  const {
    title,
    property_type,
    address,
    bedrooms,
    bathrooms,
    garages,
    land_sqm,
    price,
    images,
    open,
  } = estate;

  return (
    <Card sx={{ display: "flex", marginTop: "16px" }}>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={images}
        alt="House Pic"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body">{address}</Typography>
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {property_type}
          </Typography>
          <PropertyFeaturesContainer>
            <Features num={bedrooms} icon={<BedIcon />} />
            <Features num={bathrooms} icon={<BathtubIcon />} />
            <Features num={garages} icon={<GarageIcon />} />
          </PropertyFeaturesContainer>
          <Typography variant="caption">{`Listed at $${price}/week`}</Typography>
          <Typography variant="caption">{`${land_sqm} m2`}</Typography>
        </Box>
        <Button>View more</Button>
      </Box>
    </Card>
  );
}

export default PropertyCard;
