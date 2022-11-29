import React, { useState, useEffect } from "react";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

import {
  Card,
  Chip,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

import {
  BusinessCenter,
  CalendarMonth,
  LocationOn,
  Storefront,
  Delete,
} from "@mui/icons-material";
import ListingModal from "./ListingModal";

export default function ListCard() {
  const [posts, setPosts] = useState([]);

  const handleDelete = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

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
    <>
      <Grid container spacing={0} sx={{ pl: 2 }}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} lg={3}>
            <Card key={post.id} variant="outlined" sx={{ p: 1, m: 2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={post.logoURL}
                  />

                  <Stack direction="row" gap={1}>
                    <Chip label="Paid Project" />
                    <Chip label="Available" />
                  </Stack>

                  <Stack direction="row" gap={1}>
                    <BusinessCenter />
                    <Typography>{post.skills}</Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <CalendarMonth />

                    <Typography>Date due</Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <LocationOn />
                    <img src={post.mapURL} alt="location" />
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <Storefront />
                    <Typography>{post.name}</Typography>
                  </Stack>

                  <Typography>{post.project}</Typography>
                </Stack>
              </CardContent>

              <CardActions>
                <Stack direction="row" spacing={2}>
                  <ListingModal post={post} />
                  <Delete onClick={() => handleDelete(post.id)} />
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
