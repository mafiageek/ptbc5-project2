import { Box, Typography } from "@mui/material";
import React from "react";
import ListCard from "../components/ListCard";

export default function Listings() {
  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Box sx={{pl: 4}}>
        <Typography variant="h4">Volunteer Opportunities</Typography>
      </Box>
      <ListCard />
    </div>
  );
}
