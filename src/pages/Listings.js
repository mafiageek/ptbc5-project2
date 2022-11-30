import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import ListCard from "../components/ListCard";

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
    []
  );
  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Box sx={{ pl: 4 }}>
        <Typography variant="h4">Volunteer Opportunities</Typography>
      </Box>
      <ListCard posts={posts} user={props.user} />
    </div>
  );
}
