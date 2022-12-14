import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
    [props.user.uid],
  );

  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Container>
        <Container sx={{ pb: 4 }}>
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
                <Typography variant="h6">
                  Need help with design, branding, or social media for your for
                  good initiative?
                </Typography>
                <Typography>
                  Submit a detailed request for volunteers by filling up a form
                  here. We'll take a few days to approve your listing, and you
                  will get an email notification once it is up on the site!{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to={"/SubmitRequest"}
                  variant="contained"
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Stack spacing={2}>
          <Box></Box>
          <Typography variant="h4">
            My Listings ({props.user?.displayName})
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organisation</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Details</TableCell>

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
                    <TableCell style={{ width: 120 }}>
                      <ListingModal post={post} />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <Button
                          color="secondary"
                          onClick={() => handleEdit(post.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleDelete(post.id)}
                        >
                          <DeleteIcon />
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
