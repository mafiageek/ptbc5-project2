import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Listings from "./pages/Listings";
import SubmitRequest from "./pages/SubmitRequest";
import NavBar from "./components/NavBar.js"

import {AppBar, Toolbar, Container, Typography, Button }from "@mui/material"

function App() {
  return (
<>
<BrowserRouter>
    <AppBar>
      <Toolbar>
    
   <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MAKING MEANING
          </Typography>
          <Button variant="text" variant="h5" >  About
</Button>

          <Button variant="text" variant="h5" > Submit Request
</Button>

          <Button variant="text" variant="h5" >Volunteer Opportunities</Button>



           <Button variant="contained">Login</Button>          
          </Toolbar>
          </AppBar>

      <NavBar />
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/SubmitRequest" element={<SubmitRequest />} />
        <Route path="/Listings" element={<Listings />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
