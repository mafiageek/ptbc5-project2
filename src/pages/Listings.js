import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import ListCard from "../components/ListCard";
import { Container } from "@mui/system";

export default function Listings(props) {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(data);
        console.log(data);
      }),
    [],
  );
  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Container>
        <Box bgcolor="#FCEDA5" p={4}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Typography>
                Are you a non-profit organisation, community or ground-up
                initiative who has a project that needs a little bit of creative
                magic? Create a listing to call out to creative volunteers who
                have the skills to help you with design, branding, social media,
                or run a problem-solving workshop with you!
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained">Submit Now</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4 }}
      >
        <Typography variant="h4">
          Browse Volunteer Opportunities for Designers and Creatives
        </Typography>
      </Box>
      <ListCard posts={posts} user={props.user} />
    </div>
  );
}
