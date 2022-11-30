import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ListCard from "../components/ListCard";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function MyListings(props) {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(data.filter((post) => post.uid === props.user.uid));
        console.log(data);
      }),
    [props.user.uid]
  );

  console.log(posts);

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
