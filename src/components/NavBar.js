import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Typography } from "@mui/material";

function NavBar() {
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
    <div>
      NavBar
      {!user?.email ? (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        <>
          <Typography>{user?.displayName}</Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default NavBar;
