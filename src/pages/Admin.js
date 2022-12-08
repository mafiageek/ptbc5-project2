import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
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
  Container,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { db } from "../firebase";
import ListingModal from "../components/ListingModal";

export default function Admin(props) {
  const [toApprovePosts, setToApprovePosts] = useState([]);
  const [toUnlistPosts, setToUnlistPosts] = useState([]);
  const navigate = useNavigate();

  const handleApprove = async (id, replyTo) => {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      isDisplay: true,
    });
    emailNotify(replyTo);
  };

  const handleUnList = async (id) => {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      isDisplay: false,
    });
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  function handleEdit(listingID) {
    navigate(`/EditListing/${listingID}`);
  }

  const generateEmailPayload = (receiver1, subject, sender, message) => {
    const TEMPLATE = {
      personalizations: [
        {
          to: [{ email: receiver1 }],
          subject,
        },
      ],
      from: { email: sender },
      content: [{ type: "text/plain", value: message }],
    };
    return JSON.stringify(TEMPLATE);
  };

  const emailNotify = (receiver1) => {
    const options = {
      method: "POST",
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_SENDGRID_API_KEY,
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      data: generateEmailPayload(
        receiver1,
        `Your request has been approved`,
        "no-reply@mail.com",
        "Approved"
      ),
    };

    axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setToApprovePosts(data.filter((post) => post.isDisplay === false));
        setToUnlistPosts(data.filter((post) => post.isDisplay === true));
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
      <Container>
        <Stack spacing={2}>
          <Typography variant="h4">My Dashboard</Typography>
          <Typography variant="h6">Listings to Approve</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organisation</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Remuneration</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toApprovePosts.map((post) => (
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
                    <TableCell>{post.remuneration}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <ListingModal post={post} />

                        <Button
                          onClick={() => handleApprove(post.id, post.replyTo)}
                          color="secondary"
                        >
                          Approve
                        </Button>
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
          <Box
            sx={{
              height: 8,
            }}
          />
          <Typography variant="h6">Listings on site</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organisation</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Remuneration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toUnlistPosts.map((post) => (
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
                    <TableCell>{post.remuneration}</TableCell>

                    <TableCell>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <ListingModal post={post} />

                        <Button
                          onClick={() => handleUnList(post.id)}
                          color="secondary"
                        >
                          Unlist
                        </Button>
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
