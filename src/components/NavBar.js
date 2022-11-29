import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Typography, AppBar, Toolbar } from "@mui/material";

export default function NavBar() {
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
      <AppBar>
        <Toolbar>
          <Typography
            component={Link}
            to={"/"}
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            MAKING MEANING
          </Typography>

          <Button component={Link} to={"/About"} variant="text">
            {" "}
            About
          </Button>

          <Button component={Link} to={"/SubmitRequest"} variant="text">
            {" "}
            Submit Request
          </Button>

          <Button component={Link} to={"/"} variant="text">
            Volunteer Opportunities
          </Button>

          {!user?.email ? (
            <Button variant="contained" onClick={handleLogin} color="secondary">
              Login
            </Button>
          ) : (
            <>
              <Typography sx={{ textTransform: "uppercase", pr:2, fontWeight: 'bold' }} style={{color:"#3D45AC"}}>
                {user?.displayName}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
