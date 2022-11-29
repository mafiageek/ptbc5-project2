import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import About from "./pages/About";
import Listings from "./pages/Listings";
import SubmitRequest from "./pages/SubmitRequest";

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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFCEC",
        },
      },
    },

    

    MuiButton: {
      styleOverrides: {
        textPrimary: {
          color: "#fff",
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />

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
