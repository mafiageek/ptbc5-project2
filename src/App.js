import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Listings from "./pages/Listings";
import SubmitRequest from "./pages/SubmitRequest";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/About" element={<About />} />
        <Route path="/SubmitRequest" element={<SubmitRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
