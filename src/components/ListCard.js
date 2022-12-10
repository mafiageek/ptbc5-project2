import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
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
  TextField,
  Box,
} from "@mui/material";

import { BusinessCenter, CalendarMonth, Storefront } from "@mui/icons-material";
import ListingModal from "./ListingModal";

export default function ListCard(props) {
  const [approvePosts, setApprovePosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setApprovePosts(data.filter((post) => post.isDisplay === true));
        console.log(data);
      }),
    []
  );

  const [query, setQuery] = useState("");
  const keys = [
    "skills",
    "project",
    "about",
    "remuneration",
    "organisationName",
    "projectName",
    "renumerationDetails",
    "projectName",
  ];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  console.log(approvePosts);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { p: 0, m: 3, width: "40ch" },
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fc8c03",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ backgroundColor: "white", border: 0 }}
          id="search"
          label="search"
          variant="outlined"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </Box>
      <Grid container spacing={0} sx={{ pl: 2 }}>
        {search(approvePosts).map((post) => (
          <Grid key={post.id} item xs={12} md={6} lg={3}>
            <Card variant="outlined" sx={{ p: 1, m: 2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={post.logoURL}
                  />

                  <Stack direction="row" gap={1}>
                    <Chip label={post.remuneration} />
                    <Chip label="Available" />
                  </Stack>

                  <Stack direction="row" gap={1}>
                    <BusinessCenter />
                    <Typography>{post.skills}</Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <CalendarMonth />

                    <Typography>
                      {typeof post.dueDate === Object
                        ? post.dueDate.toDateString()
                        : post.dueDate}
                    </Typography>
                  </Stack>

                  <Stack direction="row" gap={1}>
                    <Storefront />
                    <Typography>{post.organisationName}</Typography>
                  </Stack>

                  <Typography
                  // sx={{ maxHeight: 200 }}
                  >
                    {post.project}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions>
                <Stack direction="row" spacing={2}>
                  <ListingModal post={post} />
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
