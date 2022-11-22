import React from "react";
import {
  Card,
  Chip,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

import {
  BusinessCenter,
  CalendarMonth,
  LocationOn,
  Storefront,
} from "@mui/icons-material";

export default function ListCard() {
  return (
    <>
      {" "}
      <Box
        sx={{
          height: 40,
        }}
      />
      <Card variant="outlined" sx={{ maxWidth: 345, p: 1, m: 4 }}>
        <CardContent>
          <Stack spacing={1}>
            <CardMedia
              component="img"
              height="120"
              image="./images/seedful-logo.png"
            />

            <Stack direction="row" gap={1}>
              <Chip label="Paid Project" />
              <Chip label="Available" />
            </Stack>

            <Stack direction="row" gap={1}>
              <BusinessCenter />
              <Typography>Skills Needed</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <CalendarMonth />

              <Typography>Date due</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <LocationOn />
              <Typography>Location of non-profit</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Storefront />
              <Typography>non-profit name</Typography>
            </Stack>

            <Typography>
              Short description of project: mus et iusto odio dignissimos
              ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti quos dolores et quas molestias excepturi sint
            </Typography>
          </Stack>
        </CardContent>

        <CardActions>
          <Button variant="contained"> Learn More </Button>
        </CardActions>
      </Card>
      ;
    </>
  );
}
