import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Card,
  Chip,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import About from "./pages/About";
import Listings from "./pages/Listings";
import SubmitRequest from "./pages/SubmitRequest";
import {
  BusinessCenter,
  CalendarMonth,
  LocationOn,
  Storefront,
} from "@mui/icons-material";
import NavBar from "./components/NavBar.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B93FB",
      contrastText: "#fff",
    },
    secondary: {
      main: "#012D48",
    },

    info: {
      main: "#f7d626",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MAKING MEANING
              </Typography>
              <Button variant="text" variant="h5">
                {" "}
                About
              </Button>

              <Button variant="text" variant="h5">
                {" "}
                Submit Request
              </Button>

              <Button variant="text" variant="h5">
                Volunteer Opportunities
              </Button>

              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              height: 80,
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
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/About" element={<About />} />
            <Route path="/SubmitRequest" element={<SubmitRequest />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
