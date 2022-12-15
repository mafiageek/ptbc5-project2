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
  InputAdornment,
} from "@mui/material";

import { BusinessCenter, CalendarMonth, Storefront } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
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
    [],
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
      keys.some((key) => item[key].toLowerCase().includes(query)),
    );
  };

  console.log(approvePosts);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { p: 0, m: 3, width: "900px" },
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label=""
          variant="outlined"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </Box>
      <Grid container spacing={0} sx={{ pl: 2 }}>
        {search(approvePosts).map((post) => (
          <Grid key={post.id} item xs={12} md={6} lg={3} display="flex">
            <Card variant="outlined" sx={{ p: 1, m: 2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={post.logoURL}
                  />

                  <Stack direction="row" gap={1}>
                    {post.remuneration === "Pro Bono" && (
                      <Chip
                        sx={{ backgroundColor: "#FFF6CC", color: "#012D48" }}
                        label={post.remuneration}
                      />
                    )}
                    {post.remuneration === "Paid Project" && (
                      <Chip
                        sx={{ backgroundColor: "#F6D000", color: "#012D48" }}
                        label={post.remuneration}
                      />
                    )}
                    {post.remuneration === "Low Bono" && (
                      <Chip color="tertiary" label={post.remuneration} />
                    )}
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
                  <Box
                    component="div"
                    sx={{
                      height: 100,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    <Typography>{post.project}</Typography>
                  </Box>
                </Stack>
              </CardContent>

              <CardActions>
                <ListingModal post={post} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
