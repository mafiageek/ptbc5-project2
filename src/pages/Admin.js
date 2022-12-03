import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import {
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
  TableBody,
} from "@mui/material";
import { Box } from "@mui/system";

export default function Admin() {
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
          height: 60,
        }}
      />

      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Listings to Approve</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organisation</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Deadline</TableCell>
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

                <TableCell>
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button color="secondary">See Details</Button>
                    <Button color="secondary">Approve</Button>
                    <Button color="secondary">Edit</Button>
                    <Button color="secondary">Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6">Listings on site</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organisation</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Deadline</TableCell>
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

                <TableCell>
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button color="secondary">See Details</Button>
                    <Button color="secondary">Unlist</Button>
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
