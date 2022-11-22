import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MAKING MEANING
          </Typography>
          <Button variant="text"> About</Button>

          <Button variant="text"> Submit Request</Button>

          <Button variant="text">Volunteer Opportunities</Button>

          {!user?.email ? (
            <Button variant="contained" onClick={handleLogin} color="secondary">
              Login
            </Button>
          ) : (
            <>
              <Typography>Welcome, {user?.displayName}</Typography>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
