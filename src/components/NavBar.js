import React from "react";

import { Link } from "react-router-dom";

import { Button, Typography, AppBar, Toolbar } from "@mui/material";

export default function NavBar(props) {
  const admins = [
    process.env.REACT_APP_ADMIN_WK,
    process.env.REACT_APP_ADMIN_AK,
  ];
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

          <Button component={Link} to={"/HowItWorks"} variant="text">
            {" "}
            How it Works
          </Button>

          {props.user?.uid && (
            <Button component={Link} to={"/SubmitRequest"} variant="text">
              {" "}
              Submit Request
            </Button>
          )}

          <Button component={Link} to={"/"} variant="text">
            Volunteer Opportunities
          </Button>

          {props.user?.uid && (
            <Button component={Link} to={"/MyListings"} variant="text">
              My Listings
            </Button>
          )}

          {admins.includes(props.user?.uid) && (
            <Button component={Link} to={"/Admin"} variant="text">
              Admin
            </Button>
          )}

          {!props.user?.email ? (
            <Button
              variant="contained"
              onClick={props.handleLogin}
              color="secondary"
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.handleLogout}
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
