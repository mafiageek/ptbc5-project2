import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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

import {
  BusinessCenter,
  CalendarMonth,
  LocationOn,
  Storefront,
  Delete,
  Edit,
} from "@mui/icons-material";
import ListingModal from "./ListingModal";

export default function ListCard(props) {
  const [query, setQuery] = useState("");
  const keys = ["skills", "project", "about", "remuneration"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query)),
    );
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  function handleEdit(listingID) {
    navigate(`/EditListing/${listingID}`);
  }

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
        {search(props.posts).map((post) => (
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
                    <LocationOn />
                    <img src={post.mapURL} alt="location" />
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
                  {props.user?.uid === post?.uid && props.user?.uid != null && (
                    <Delete onClick={() => handleDelete(post.id)} />
                  )}
                  {props.user?.uid === post?.uid && props.user?.uid != null && (
                    <Edit onClick={() => handleEdit(post.id)} />
                  )}
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
