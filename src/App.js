import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Admin from "./pages/Admin";
import HowItWorks from "./pages/HowItWorks";
import Listings from "./pages/Listings";
import SubmitRequest from "./pages/SubmitRequest";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
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

    tertiary: {
      main: "#FCEDA5",
      contrastText: "#012D48",
    },

    info: {
      main: "#f7d626",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFEF8",
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
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <NavBar
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              user={user}
            />

            <Routes>
              <Route path="/" element={<Listings user={user} />} />
              <Route path="/HowItWorks" element={<HowItWorks />} />
              <Route
                path="/SubmitRequest"
                element={<PrivateRoute user={user} />}
              >
                <Route
                  path="/SubmitRequest"
                  element={<SubmitRequest user={user} />}
                />
              </Route>
              <Route path="/MyListings" element={<PrivateRoute user={user} />}>
                <Route
                  path="/MyListings"
                  element={<MyListings user={user} />}
                ></Route>
              </Route>
              <Route path="/EditListing" element={<PrivateRoute user={user} />}>
                <Route
                  path="/EditListing/:id"
                  element={<EditListing user={user} />}
                ></Route>
              </Route>
              <Route path="/Admin" element={<AdminRoute user={user} />}>
                <Route path="/Admin" element={<Admin user={user} />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
