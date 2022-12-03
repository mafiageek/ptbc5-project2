import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
    [props.user.uid],
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
        <Typography variant="h4">My Projects</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organisation</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.organisationName}
                </TableCell>
                <TableCell>{post.contactName}</TableCell>
                <TableCell>{post.email}</TableCell>
                <TableCell>{post.dueDate}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button color="secondary">See Details</Button>
                    <Button color="secondary">Edit</Button>
                    <Button color="secondary">Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
