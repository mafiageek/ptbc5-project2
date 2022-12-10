import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
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
import { db } from "../firebase";
import { Container, Stack } from "@mui/system";
import ListingModal from "../components/ListingModal";

export default function MyListings(props) {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  function handleEdit(listingID) {
    navigate(`/EditListing/${listingID}`);
  }

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(data.filter((post) => post.uid === props.user.uid));
      }),
    [props.user.uid]
  );

  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Container>
        <Stack spacing={2}>
          <Typography variant="h4">My Listings</Typography>

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
                    <TableCell>
                      {post.isDisplay ? "Listed" : "Pending Approval"}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <ListingModal post={post} />
                        <Button
                          color="secondary"
                          onClick={() => handleEdit(post.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </div>
  );
}
